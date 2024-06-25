## Getting Started

Project developed with Next and applying Clean Architecture

## Steps  



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Git

```bash
git checkout <feature-branch>
git pull
git checkout <release-branch>
git pull
git merge --no-ff <feature-branch>
git push
git tag -a branch-<feature-branch> -m "Merge <feature-branch> into <release-branch>"
git push --tags
git branch -d <feature-branch>
git push origin :<feature-branch>
```

#### Documentación de Servicio de Mensajería.

La entidad de mensaje tiene campos fijos y parámetros variables, estos parámetros ayudan a que cada tipo de mensaje sea dinámico, pudiendo ser editado con nuevos campos o eliminando otros.

| Parámetro    | Descripción                                                          |
| ------------ | -------------------------------------------------------------------- |
| id           | Unique id of 4 digits.                                               |
|              | -**Type:**String                                                     |
|              | -**Description:**Unique id of 4 digits                               |
| TSN          | TSN number of 4 digits.                                              |
|              | -**Type:**String                                                     |
|              | -**Description:**TSN number of 4 digits                              |
| OSN          | OSN number of 4 digits.                                              |
|              | -**Type:**String                                                     |
|              | -**Description:**OSN number of 4 digits                              |
| NSE          | NSE number of 4 digits.                                              |
|              | -**Type:**String                                                     |
|              | -**Description:**NSE number of 4 digits                              |
| messageCode  | Message code that represents its type.                               |
|              | -**Type:**String                                                     |
|              | -**Description:**Message code that represents its type               |
| destination  | Represents the destination institution code.                         |
|              | -**Type:**String                                                     |
|              | -**Description:**Represents the destination institution code         |
| description  | Message description.                                                 |
|              | -**Type:**String                                                     |
|              | -**Description:**Message description                                 |
| priority     | Message priority.                                                    |
|              | -**Type:**String                                                     |
|              | -**Description:**Message priority                                    |
| status       | Message status.                                                      |
|              | -**Type:**String                                                     |
|              | -**Description:**Message status                                      |
| sender       | Message sender institution code.                                     |
|              | -**Type:**String                                                     |
|              | -**Description:**Message sender institution code (3 or 4 characters) |
| creationDate | Message date of creation.                                            |
|              | -**Type:**String                                                     |
|              | -**Description:**Message date of creation                            |
| creationTime | Message time of creation.                                            |
|              | -**Type:**String                                                     |
|              | -**Description:**Message time of creation                            |
| receiver     | Message receiver.                                                    |
|              | -**Type:**String                                                     |
|              | -**Description:**Message receiver                                    |
| receivedDate | Message date of reception.                                           |
|              | -**Type:**String                                                     |
|              | -**Description:**Message date of reception                           |
| receivedTime | Message time of reception.                                           |
|              | -**Type:**String                                                     |
|              | -**Description:**Message time of reception                           |

###### Parámetros dinámicos por tipo de mensaje, ejemplo de parámetros MS199:

| Parámetro              | Descripción                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| institutionDestination | Selector for destination institution.                              |
|                        | -**Label:**Institución de Destino                                  |
|                        | -**Type:**selector                                                 |
|                        | -**Description:**Todas las instituciones posibles                  |
|                        | -**Placeholder:**Seleccionar institución de destino...             |
|                        | -**Validations:**                                                  |
|                        | - Required: true                                                   |
|                        | - Max Length: 50                                                   |
|                        | - Min Length: 1                                                    |
| userResponsable        | Input field for the name and position of the responsible person.   |
|                        | -**Label:**Nombre y Cargo del Responsable                          |
|                        | -**Type:**inputText                                                |
|                        | -**Description:**Nombre y Cargo del Responsable                    |
|                        | -**Placeholder:**Seleccionar institución de destino...             |
|                        | -**Validations:**                                                  |
|                        | - Required: true                                                   |
|                        | - Max Length: 50                                                   |
|                        | - Min Lenght: 0                                                    |
| ourReference           | Input field for our reference.                                     |
|                        | -**Label:**Nuestra Referencia                                      |
|                        | -**Type:**input                                                    |
|                        | -**Description:**Nuestra Referencia                                |
|                        | -**Value:**38DEAE3278173SDD                                        |
|                        | -**Placeholder:**Agregar nuestra referencia...                     |
|                        | -**Validations:**                                                  |
|                        | - Required: false                                                  |
|                        | - Max Lenght: 50                                                   |
|                        | - Min Lenght: 0                                                    |
| yourReference          | Input field for your reference.                                    |
|                        | -**Label:**Su Referencia                                           |
|                        | -**Type:**input                                                    |
|                        | -**Description:**Su Referencia                                     |
|                        | -**Value:**38DEAE3278173SDD                                        |
|                        | -**Placeholder:**Agregar su referencia...                          |
|                        | -**Validations:**                                                  |
|                        | - Required: false                                                  |
|                        | - Max Lenght: 50                                                   |
|                        | - Min Lenght: 0                                                    |
| freeText               | Input field for free text.                                         |
|                        | -**Label:**Texto Libre                                             |
|                        | -**Type:**longInput                                                |
|                        | -**Description:**Texto Libre                                       |
|                        | -**Placeholder:**Agregar texto del mensaje...                      |
|                        | -**Validations:**                                                  |
|                        | - Required: false                                                  |
|                        | - Max Lenght: 50                                                   |
|                        | - Min Lenght: 0                                                    |
| observation            | Input field for observations.                                      |
|                        | -**Label:**Observaciones                                           |
|                        | -**Type:**mediumInput                                              |
|                        | -**Description:**Observaciones                                     |
|                        | -**Placeholder:**Agregar observaciones si se estima conveniente... |
|                        | -**Validations:**                                                  |
|                        | - Required: false                                                  |
|                        | - Max Lenght: 200                                                  |
|                        | - Min Lenght: 0                                                    |

Ejemplo mensaje MS 199:

JSON

```
{
"id": "123", // String - unique id
"messageCode": "199", // String - message code that represent its type
"destination": "21", // String - represents the destination institution code
"description": "DESCRIPTION", // String - message description
"priority": "02", // String - message priority
"status": "01", // String - message status
"date": "2020-01-01", // String - message date
"time": "12:00", // String - message time
"sender": "01", // String - message sender
"receiver": "02", // String - message receiver
"parameters": [{
"id": "123", // String - Id of the parameter
"name": "institutionDestination", // String - name of the parameter
"type": "selector", // String - type of the parameter
"label": "Institución de Destino", // String- label to use to show to the user
"description": "Todas las instituciones posibles", // String - description of the parameter
"options": [
"21",
"02",
"11"
], // String - different kind of options for the selector
"placeholder": "Seleccionar institución de destino..." // String - value of the parameter
},
{
"id": "456", // String - Id of the parameter
"name": "userResponsable", //
"type": "input", // String - type of the parameter
"label": "Nombre y Cargo del Responsable", // String- label to use to show to the user
"description": "Nombre y Cargo del Responsable", // String - description of the parameter
"value": "Juan Perez", // String - value of the parameter
"placeholder": "Agregar nombre y cargo del responsable..." // String - value of the parameter
},
{
"id": "789", // String - Id of the parameter
"name": "ourReference", // String - name of the parameter
"type": "input", // String - type of the parameter
"label": "Nuestra Referencia", // String- label to use to show to the user
"description": "Nuestra Referencia", // String - description of the parameter
"value": "38DEAE3278173SDD", // String - value of the parameter
"placeholder": "Agregar nuestra referencia..." // String - value of the parameter
},
{
"id": "101", // String - Id of the parameter
"name": "yourReference", // String - name of the parameter
"type": "input", // String - type of the parameter
"label": "Su Referencia", // String- label to use to show to the user
"description": "Su Referencia", // String - description of the parameter
"value": "38DEAE3278173SDD", // String - value of the parameter
"placeholder": "Agregar su referencia..." // String - value of the parameter
},
{
"id": "112", // String - Id of the parameter
"name": "freeText", // String - name of the parameter
"type": "longInput", // String - type of the parameter
"label": "Texto Libre", // String- label to use to show to the user
"description": "Texto Libre", // String - description of the parameter
"value": "", // String - value of the parameter
"placeholder": "Agregar texto del mensaje..." // String - value of the parameter
},
{
"id": "123", // String - Id of the parameter
"name": "observation", // String - name of the parameter
"type": "mediumInput", // String - type of the parameter
"label": "Observaciones", // String- label to use to show to the user
"description": "Observaciones", // String - description of the parameter
"value": "", // String - value of the parameter
"placeholder": "Agregar observaciones si se estima conveniente..." // String - value of the parameter
}
]
}
```
