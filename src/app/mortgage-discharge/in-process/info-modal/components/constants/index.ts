import { detailsMS } from "../../types";

export const details: detailsMS[] = [
    { label: 'Fecha Aceptación', value: '14/02/2024' },
    { label: 'Requiere Liquidación de Pre Pago', value: 'Si' },
    { label: 'Firma Electrónica Receptor', value: '' },
    { label: 'Apoderado Nombre, RUT', value: '34.323.233-3' },
    { label: 'Observaciones', value: 'Aceptado' },
];

export const data = {
    TSN: '15050',
    sender: '0012 - BANCO ESTADO',
    creationDate: '19/01/2024', 
    creationTime: '11:00:00',
    priority: '02 Normal Sin Aviso de Entrega',
};

export const dataMS670 = {
    NSR: '43007',
    LSN: '3007',
    sender: '0001 - BANCO DE CHILE',
    creationDate: '19/01/2024', 
    creationTime: '11:00:00',
    priority: '02 Normal Sin Aviso de Entrega',
};

export const detailsMS670Canal: detailsMS[] = [
    { label: 'Fecha de Alzamiento', value: '17/01/2024' },
    { label: 'Canal', value: 'Personas' },
    { label: 'Tipo de Operacion', value: 'Mutuo con Compraventa' },
    { label: 'Notaria Repertorio', value: '15001 - Conservador y Archivero de Arica' },
    { label: 'Fecha Repertorio', value: '03/01/2024' },
    { label: 'Número Repertorio', value: '1410' },
    { label: 'Institución', value: 'Banco de Chile' },
    { label: 'Vendedor:', value: 'Juan Perez Gonzalez' },
    { label: 'RUT de Vendedor', value: '98.765.432-1' },
    { label: 'Comprador', value: 'Carolina Lopez Ruiz' },
    { label: 'RUT de Comprador', value: '12.345.768-9' },
];

export const detailsMS670Inmueble: detailsMS[] = [
    { label: 'Tipo de Inmueble', value: 'Departamento' },
    { label: 'Descripción del Inmueble', value: 'Vitacura 1010, 3 dormitorios, 2 baños, 80m²' },
    { label: 'Comuna', value: 'Providencia' },
    { label: 'Region', value: 'Metropolitana, Santiago' },
    { label: 'Institución', value: 'Banco Internacional' },
    { label: 'Comprador', value: 'Juan Perez Gonzalez' },
    { label: 'Monto del Mutuo', value: '3.259,59 UF' },
    { label: 'Plazo (años)', value: '20' },
    { label: 'Monto del Mutuo Complementario', value: '540 UF' },
    { label: 'Código Interno', value: 'AH00090000000040' },
    { label: 'Deudor', value: 'Juan Perez Gonzalez' },
    { label: 'RUT del Deudor', value: '12.345.768-9' },
    { label: 'Monto UF', value: '3.799,59 UF' },
];