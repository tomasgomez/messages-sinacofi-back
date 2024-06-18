"use client";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFTemplate } from "../component/PDFTemplate";
import { useEffect, useState } from "react";
import { getMessageDetails } from "../services/common";
import Loader from "@/components/Loader";

const PDFScreenView = () => {
  const [dataDetails, setDataDetails] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlCompleta = window.location.href;
      const extractedId = urlCompleta.split("id=")[1];
      setId(extractedId as string);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const details = await getMessageDetails(id as string);
        setDataDetails(details);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {isloading ? (
        <Loader label="Cargando Archivo…" minHeight={"100vh"} />
      ) : (
        <PDFViewer width="100%" height="100%">
          <PDFTemplate data={dataDetails} />
        </PDFViewer>
      )}
    </div>
  );
};

export default PDFScreenView;
