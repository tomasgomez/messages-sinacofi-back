import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function reverseArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  let reversedArray = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArray.push(arr[i]);
  }
  return reversedArray;
}

// Conbine arrays, have priority in the arrayB
export function combineArrays(arrayA, arrayB) {
  const mapaA = new Map(arrayA.map((obj) => [obj.label, obj]));
  const mapaB = new Map(arrayB.map((obj) => [obj.label, obj]));

  const resultado = [];

  // Add elements of arrayA that are not in arrayB
  for (const [label, obj] of mapaA) {
    if (!mapaB.has(label)) {
      resultado.push(obj);
    }
  }

  // Add elements from arrayB and overwrite if label is repeated
  for (const [label, obj] of mapaB) {
    resultado.push(obj);
  }

  return resultado;
}

export function IsEmptyObject(elem) {
  if (!Array.isArray(elem) && typeof elem === "object") {
    // Comprobamos si el objeto no tiene ninguna propiedad
    if (Object.keys(elem).length === 0) {
      return true;
    }
  }
  return false; // Si no es un objeto vacío, retornamos la variable tal cual
}

export function ObjectsAreEquals(object1, object2) {
  if (
    typeof object1 !== "object" ||
    typeof object2 !== "object" ||
    object1 === null ||
    object2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!object2.hasOwnProperty(key) || object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export const exportToExcel = async (name, columns, data) => {
  if (!columns || !data) {
    console.error("Columns or data is not defined.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // Add columns
  worksheet.columns = columns.map((col) => ({
    header: col.label,
    key: col.id,
  }));

  // Add rows
  data.forEach((row) => {
    for (let key in row) {
      if (row[key] === "") {
        row[key] = "-";
      }
    }
    worksheet.addRow(row);
  });

  // Adjust column widths to content
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellLength = cell.value ? cell.value.toString().length : 10;
      if (cellLength > maxLength) {
        maxLength = cellLength;
      }
    });
    if (column) {
      column.width = maxLength + 2; // Adding a little extra space
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer], { type: "application/octet-stream" }),
    name + ".xlsx"
  );
};
