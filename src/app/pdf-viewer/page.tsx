"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
// import { mockDocument } from "./mockDocument";
import { base64ToBlob } from "@/app/mortgage-discharge/utils";
import { getDocument } from "../services/common";

const PDFScreenView = () => {
  const [pdfUrl, setPdfUrl] = useState<any>("");
  const [pdfName, setPdfName] = useState<string>("");

  const [isloading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const tryExtractId = (attempts: number) => {
      if (attempts >= 5) {
        console.log("Se han agotado los intentos de obtener el ID.");
        return;
      }

      console.log("Intento de obtener el ID número: ", attempts + 1);

      if (typeof window !== "undefined") {
        document.body.style.margin = "0px";
        const urlCompleta = window.location.href;
        const extractedId = urlCompleta.split("id=")[1];
        if (extractedId) {
          setId(extractedId);
          return;
        }
      }

      setTimeout(() => tryExtractId(attempts + 1), 500 * (attempts + 1));
    };

    tryExtractId(0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const dataDocument = await getDocument(id as string);
          // const dataDocument = mockDocument;
          console.log(dataDocument);
          if (!dataDocument) {
            throw new Error("El documento no tiene contenido");
          }

          if (!dataDocument.url && !dataDocument.content) {
            throw new Error("El documento no tiene contenido");
          }

          setPdfName(dataDocument?.documentName || "");

          if (dataDocument.url) {
            setPdfUrl(dataDocument[0].url);
          }

          if (!dataDocument.url && dataDocument.content) {
            const blob = base64ToBlob(dataDocument?.content || "");
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
          }

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {isloading ? (
        <Loader label="Cargando Archivo…" minHeight={"100vh"} />
      ) : (
        <iframe src={pdfUrl} width="100%" height="100%" title={pdfName} />
      )}
    </div>
  );
};

export default PDFScreenView;
