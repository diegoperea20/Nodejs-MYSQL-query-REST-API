import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;

    // Obtén el último ID de la tabla
    const [lastRow] = await pool.query("SELECT id FROM employee ORDER BY id DESC LIMIT 1");
    const newId = lastRow.length > 0 ? lastRow[0].id + 1 : 1;

    // Inserta el nuevo registro con el ID específico
    const [rows] = await pool.query(
      "INSERT INTO employee (id, name, salary) VALUES (?, ?, ?)",
      [newId, name, salary]
    );

    res.status(201).json({ id: newId, name, salary });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const getEmployeesByName = async (req, res) => {
  try {
    const { name } = req.params;
    const [rows] = await pool.query("SELECT * FROM employee WHERE name LIKE ?", [`%${name}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No employees found with the given name" });
    }

    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployeesBySalaryGreaterThan = async (req, res) => {
  try {
    const { salary } = req.params;
    const [rows] = await pool.query("SELECT * FROM employee WHERE salary > ?", [salary]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No employees found with a salary greater than the specified value" });
    }

    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
