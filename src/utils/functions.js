export function reverseArray(arr) {
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
