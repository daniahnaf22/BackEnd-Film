import Artis from "../models/Artis.js";

//Mendapatkan semua data artis
export async function getAllArtis(req, res) {
  try {
    const artis = await Artis.findAll();
    res.json(artis);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Tidak berhasil menampilkan seluruh data artis" });
  }
}

// Mendapatkan data artis berdasarkan ID
export async function getArtisById(req, res) {
  const { id } = req.params;
  try {
    const artis = await Artis.findByPk(id);
    if (!artis) {
      return res.status(404).json({ message: "Artis tidak ditemukan" });
    }
    res.json(artis);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil menampilkan data artis berdasarkan ID",
    });
  }
}

// Menambahkan data artis baru
export async function createArtis(req, res) {
  const { namaArtis, tahunLahir, kewarganegaraan } = req.body;

  try {
    const artis = await Artis.create({
      namaArtis,
      tahunLahir,
      kewarganegaraan,
    });
    res.status(201).json(artis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tidak berhasil membuat data artis baru" });
  }
}

//Memperbarui data artis berdasarkan ID
export async function updateArtisById(req, res) {
  const { id } = req.params;
  const { namaArtis, tahunLahir, kewarganegaraan } = req.body;

  try {
    const updateArtis = await Artis.update(
      {
        namaArtis,
        tahunLahir,
        kewarganegaraan,
      },
      { where: { id }, returning: true }
    );
    if (!updateArtis[0] === 0) {
      return res.status(404).json({ message: "Artis tidak ditemukan" });
    }
    res.json(updateArtis[1][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil memperbarui data artis berdasarkan ID",
    });
  }
}

//Menghapus data artis berdasarkan ID
export async function deleteArtisById(req, res) {
  const { id } = req.params;

  try {
    const deleteArtis = await Artis.destroy({ where: { id } });
    if (!deleteArtis) {
      return res.status(404).json({ message: "Artis tidak ditemukan" });
    }
    res.json({ message: "Artis berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil menghapus data artis berdasarkan ID",
    });
  }
}
