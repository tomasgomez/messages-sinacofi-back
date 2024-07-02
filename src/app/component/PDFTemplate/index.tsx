"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Message } from "../inbox-table/type";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: "20px",
    flexGrow: 1,
    // fontFamily: 'DotMatrix', // TODO
    fontSize: "10px",
    textTransform: "uppercase",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const PDFTemplate = ({ data }: { data?: Message | Message[] }) => {
  const renderMesage = (dataElem?: Message) => {
    const {
      messageCode = "",
      description = "",
      priority = "",
      destination = "",
      parameters = [],
      creationDate = "",
    } = dataElem || {};
    return (
      <View style={styles.section}>
        <Text>==== S I N A F O C I TID-WEB ==== TID: </Text>
        <Text>
          ------------------------------------------------------------------------------------
        </Text>
        <Text>
          {messageCode} {description} PRI: {priority}
        </Text>
        <Text>DESTINO: {destination}</Text>
        <Text>
          ------------------------------------------------------------------------------------
        </Text>
        {parameters.map((field) => (
          <React.Fragment key={field?.id}>
            <Text>
              {field?.label} : {field?.displayValue || field?.value}
            </Text>
          </React.Fragment>
        ))}
        <Text>
          -------------------------------------------------------------------------------------
        </Text>
        <View style={styles.footer}>
          <Text>IMP:</Text>
          <Text>AREA:</Text>
          <Text>LOCAL:</Text>
          <Text>{creationDate}</Text>
        </View>
        <Text>
          ====================================================================================
        </Text>
      </View>
    );
  };

  return (
    <Document
      title={
        Array.isArray(data)
          ? data.length > 1
            ? "Imprimir Mensajes"
            : `MS ${data[0]?.messageCode} - ${data[0]?.description}`
          : `MS ${data?.messageCode} - ${data?.description}`
      }
    >
      <Page size="A4" style={styles.page}>
        {data && Array.isArray(data)
          ? data.map((messages) => renderMesage(messages))
          : renderMesage(data)}
      </Page>
    </Document>
  );
};
