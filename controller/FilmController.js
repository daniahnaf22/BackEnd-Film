import Film from "../models/Film.js";

//Mendapatkan semua data film
export async function getAllFilm(req, res) {
  try {
    const film = await Film.findAll();
    res.json(film);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Tidak berhasil menampilkan seluruh data film" });
  }
}

// Mendapatkan data film berdasarkan ID
export async function getFilmById(req, res) {
  const { id } = req.params;
  try {
    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).json({ message: "film tidak ditemukan" });
    }
    res.json(film);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil menampilkan data film berdasarkan ID",
    });
  }
}

// Menambahkan data artis baru
export async function createFilm(req, res) {
  const { judulFilm, deskFilm, artisId, rumahProduksiId, tahun, negaraId } =
    req.body;

  try {
    const film = await Film.create({
      judulFilm,
      deskFilm,
      artisId,
      rumahProduksiId,
      tahun,
      negaraId,
    });
    res.status(201).json(film);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tidak berhasil membuat data film baru" });
  }
}

// Memperbarui data film berdasarkan ID
export async function updateFilmById(req, res) {
  const { id } = req.params;
  const { judulFilm, deskFilm, artisId, rumahProduksiId, tahun, negaraId } =
    req.body;

  try {
    const updatefilm = await Film.update(
      {
        judulFilm,
        deskFilm,
        artisId,
        rumahProduksiId,
        tahun,
        negaraId,
      },
      { where: { id }, returning: true }
    );
    if (updatefilm[0] === 0) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }
    res.status(201).json(updatefilm[1][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tidak berhasil membuat data film baru" });
  }
}

//menghapus film berdasarkan ID
export async function deleteFilmById(req, res) {
  const { id } = req.params;

  try {
    const deleteFilm = await Film.destroy({ where: { id } });
    if (!deleteFilm) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }
    res.json({ message: "Film berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil menghapus data Film berdasarkan ID",
    });
  }
}
