import { createDateRangeFilter } from "@/backend/utils/functions";
import { Filter } from '@/backend/entities/cuk/filter';
import { Prisma } from "@prisma/client";

export const filtersCukWhere = (filter: Filter): Prisma.CUKWhereInput => {
  let where: Prisma.CUKWhereInput = {
      ...createDateRangeFilter(filter.startDate, filter.endDate),
      parameters:{ some: {...filtersParametersWhere(filter)} }, 
      messages: { some: {...filtersMessagesWhere(filter)} } 
  };

  // FILTERS CUK by cukCode
  if(filter.cukCode && filter.cukCode.length > 0){
      where.cukCode = { in: filter.cukCode };
  }

  // FILTERS CUK by id
  if(filter.id && filter.id.length > 0){
      where.id = { in: filter.id };
  }

  if(filter.statusCategory && filter.statusCategory.length > 0){
      where.status = { in: filter.statusCategory };
  }

  return where;
}

const filtersMessagesWhere = (filter: Filter): Prisma.MessageWhereInput => {
  let where: Prisma.MessageWhereInput = {};
  where.AND=[];

  // FILTER MESSAGES BY institutionDestination
  if (filter.institutionDestination && filter.institutionDestination.length > 0) {
      where.AND.push({
        destination:{ in: filter.institutionDestination },
        messageCode: '670'
      })
      // where.destination = { in: filter.institutionDestination };
      // where.status = { some:{ id: { in: ["05"] } } };            
  }

  // const SenderMessageCodes = ["670","674","677"];
  // const ReceiverMessageCodes = ["671", "672", "673", "675","676","678", "679"];

  // FILTER MESSAGES BY messageCode
  if ((filter.messageCode && filter.messageCode.length > 0) && (filter.status && filter.status.length > 0)) {
      const messageCode = {
        messageCode: { in: filter.messageCode },
        status:{},
        origin:{}
      }
      // where.messageCode = { in: filter.messageCode };

      // FILTERS CUK BY status 
      if(filter.status && filter.status.length > 0){
        messageCode.status = { 
          some:{ 
            id: { in: filter.status }
          }
        };
      }

      if (filter.institutionCode && filter.institutionCode.length > 0) {
        messageCode.origin = { in: filter.institutionCode };
      }

      where.AND.push(messageCode);
  // FILTER MESSAGES BY institutionCode
  } else if (filter.institutionCode && filter.institutionCode.length > 0) {
    where.OR = [{
      origin: { in: filter.institutionCode },
      status: { 
        some: { 
            id: { in: ["01", "05"] }
        }
      }       
    }, {
      destination: { in: filter.institutionCode },
      status: { 
        some:{
          id: { in: ["06"] }
        } 
      }
    }]
  }

  const filtersByParameters = whereMessagesByParameters(filter);
  if(Array.isArray(filtersByParameters.AND) && filtersByParameters.AND.length > 0){
    where.AND = [...where.AND, ...filtersByParameters.AND];
  }  

  return where;
}

const filtersParametersWhere = (filter: Filter): Prisma.ParametersWhereInput => {
  let where: Prisma.ParametersWhereInput = {};
  where.AND=[];

  // FILTER PARAMETERS BY description
  if(filter.description && filter.description.length > 0){
      where.description ={ in: filter.description };
  }

  return where;
}

const checkFilterAndAddAsParameter = (name:string ,value: string[] | null | undefined) => {
  if(value && value.length > 0){
      return {
        parameters:{
          some:{
              name: name,
              value: { in: value}
          }
      }};
  }
  return {};
}

const whereMessagesByParameters = (filter: Filter): Prisma.MessageWhereInput => {
  let where: Prisma.MessageWhereInput = {};
  where.AND=[
    checkFilterAndAddAsParameter('sellerDni' ,filter.sellerDni),
    checkFilterAndAddAsParameter('channel' ,filter.channel),
    checkFilterAndAddAsParameter('region' ,filter.region),
    checkFilterAndAddAsParameter('buyerDni' ,filter.buyerDni),
    checkFilterAndAddAsParameter('buyer' ,filter.buyer),
    checkFilterAndAddAsParameter('ownerDni' ,filter.ownerDni),
    checkFilterAndAddAsParameter('owner' ,filter.owner),
    checkFilterAndAddAsParameter('borrowerDni' ,filter.borrowerDni),
    checkFilterAndAddAsParameter('borrower' ,filter.borrower),
    checkFilterAndAddAsParameter('notary' ,filter.notary),
    checkFilterAndAddAsParameter('repertoireDate' ,filter.repertoireDate)
  ];

  where.AND = where.AND.filter((value: {[key: string]: any}) => Object.keys(value).length > 0);
  return where;
}