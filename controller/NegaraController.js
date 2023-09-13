import Negara from "../models/Negara.js";

// Mendapatkan semua data negara
export async function getAllNegara(req, res) {
  try {
    const negara = await Negara.findAll();
    res.json(negara);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tidak berhasil mendapatkan seluruh data negara" });
  }
}

//Mendapatkan negara berdasarkan ID
export async function getNegaraById(req, res) {
  const { id } = req.params;
  try {
    const negara = await Negara.findByPk(id);
    if (!negara) {
      return res.status(404).json({ msg: "Negara not found" });
    }
    res.json(negara)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Tidak berhasil menampilkan data negara berdasarkan Id",
    });
  }
}

//Menambahkan negara baru
export async function createNegara(req, res) {
  const body = {
    elementData: req.body.elementData,
    namaNegara: req.body.namaNegara,
  };

  if (!body.namaNegara) {
    return res.status(400).json({ msg: "Nama Negara harus di isi" });
  }

  try {
    const negara = await Negara.create(body);
    res.status(201).json(negara);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Tidak berhasil membuat data negara baru" });
  }
}

//Memperbarui data negara berdasrkan ID
export async function updateNegaraById(req, res) {
  const { id } = req.params;
  const { namaNegara } = req.body;

  try {
    const updateNegara = await Negara.update(
      { namaNegara },
      { where: { id }, returning: true }
    );
    if (updateNegara[0] === 0) {
      return res.status(404).json({ msg: "Negara not found" });
    }
    res.json(updateNegara[1][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Tidak berhasil menampilkan data negara berdasarkan Id",
    });
  }
}

//Menghapus negara berdasarkan ID
export async function deleteNegaraById(req, res) {
  const { id } = req.params;

  try {
    const deleteNegara = await Negara.destroy({
      where: { id },
    });
    if (!deleteNegara) {
      return res.status(404).json({ msg: "Negara not found" });
    }
    res.json({ msg: "Negara berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Tidak berhasil menampilkan data negara berdasarkan Id",
    });
  }
}
