import RumahProduksi from "../models/RumahProduksi.js";

//Mendapatkan semua data rumah produksi
export async function getAllRumahProduksi(req, res) {
  try {
    const rumahProduksi = await RumahProduksi.findAll();
    res.json(rumahProduksi);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil mendapatkan seluruh data rumah produksi",
    });
  }
}

//Mendapatkan Rumah Produksi berdasarkan ID
export async function getRumahProduksiById(req, res) {
  const { id } = req.params;
  try {
    const rumahProduksi = await RumahProduksi.findByPk(id);
    if (!rumahProduksi) {
      return res.status(404).json({ message: "Rumah Produksi not found" });
    }
    res.json(rumahProduksi);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Tidak berhasil menampilkan data RumahProduksi berdasarkan Id",
    });
  }
}

//Menambahkan rumah produksi baru
export async function createRumahProduksi(req, res) {
  const { namaRumahProduksi, tahunBerdiri } = req.body;

  try {
    const rumahProduksi = await RumahProduksi.create({
      namaRumahProduksi,
      tahunBerdiri,
    });
    res.status(201).json(rumahProduksi);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Tidak berhasil membuat data rumah produksi" });
  }
}

//Memperbarui data rumah produksi berdasarkan ID
export async function updateRumahProduksiById(req, res) {
  const { id } = req.params;
  const { namaRumahProduksi, tahunBerdiri } = req.body;

  try {
    const updateRumahProduksi = await RumahProduksi.update(
      { namaRumahProduksi, tahunBerdiri },
      { where: { id }, returning: true }
    );
    if (updateRumahProduksi[0] === 0) {
      return res
        .status(404)
        .json({ message: "Rumah produksi tidak ditemukan" });
    }
    res.json(updateRumahProduksi[1][0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Tidak berhasil membuat data rumah produksi" });
  }
}

//Menghapus rumah produksi berdasarkan ID
export async function deleteRumahProduksiById(req, res) {
  const { id } = req.params;

  try {
    const deleteRumahProduksi = await RumahProduksi.destroy({ where: { id } });
    if (!deleteRumahProduksi) {
      return res
        .status(404)
        .json({ message: "Rumah produksi tidak ditemukan" });
    }
    res.json({ message: "Rumah Produksi berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Tidak berhasil menghapus data rumah produksi" });
  }
}
