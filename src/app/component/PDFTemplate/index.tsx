'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font  } from '@react-pdf/renderer';
import { MSDetail } from '../inbox-table/type';

// import DotMatrix from '../../../fonts/DOTMBold.ttf'; // TODO: DotMatrix font to be use

// react-pdf register syntax to be use when font issue is fixed.

// Font.register({
//   family: 'DotMatrix',
//   src: DotMatrix, 
//   format: "truetype",
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: '20px',
  },
  section: {
    margin: 10,
    padding: '20px',
    flexGrow: 1,
    // fontFamily: 'DotMatrix', // TODO
    fontSize: '10px',
    textTransform: 'uppercase',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export const PDFTemplate = ({data}: {data: MSDetail | MSDetail[]}) => {

  const renderMesage = (data: MSDetail ) => (
    <View style={styles.section}>
      <Text>==== S  I  N  A  F  O C  I    TID-WEB ==== TID: </Text>
      <Text>------------------------------------------------------------------------------------</Text>
      <Text>{data.messageCode} {data.description} PRI: {data.priority}</Text>
      <Text>DESTINO: {data.destination}</Text>
      <Text>------------------------------------------------------------------------------------</Text>
      {data.parameters.map(field => ( 
        <React.Fragment key={field.id}>
          <Text>{field.label} : {field.value}</Text>
          
        </React.Fragment>
      ))}
      <Text>-------------------------------------------------------------------------------------</Text>
      <View style={styles.footer}>
        <Text>IMP:</Text>
        <Text>AREA:</Text>
        <Text>LOCAL:</Text>
        <Text>{data.creationDate}</Text>
      </View>
      <Text>====================================================================================</Text>
    </View>
  );

  return (
      <Document title={Array.isArray(data) ? 'Imprimir Mensajes': `MS ${data.messageCode} -  ${data.description}`}>
        <Page 
          size="A4" 
          style={styles.page}
        >
          {Array.isArray(data) ? data.map(messages => renderMesage(messages)) : renderMesage(data) }
        </Page>
      </Document>
  )
};
