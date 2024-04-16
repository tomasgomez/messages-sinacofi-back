import { Alignment } from "@/app/component/inbox-table/type";

export const columnData: any[] = [ //todo: fix types in EnhancedTable Table parameters
    {
        id: "state",
        label: "Estado",
        align: Alignment.LEFT,
        sortable: false,
    },
    {
        id: "statusDate",
        label: "Fecha de Estado",
        align: Alignment.LEFT,
        sortable: false,
      },
];

export const rowData = [
    {state: '01 - Envio Alzamiento Hipotecario', statusDate: '16/01/2024 11:00:00' },
    {state: '021 - Evaluación Alzamiento Hipotecario En Proceso', statusDate: '20/01/2024 11:00:00'},
    {state: '022 - Evaluación Alzamiento Hipotecario Aprobada', statusDate: '22/01/2024 11:00:00'},
    {state: '041 - Firma de Escritura en Proceso', statusDate: '26/01/2024 11:00:00'},
];