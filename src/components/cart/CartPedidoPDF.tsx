import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "@values/colors";
import { getFechaActual, formatMoney } from "@utils/utils";
import { List } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";

interface PdfPreviewProps {
  data: List[];
}

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },

  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: COLORS.black,
  },

  titleContainer: {
    flexDirection: "row",
    marginTop: 5,
    paddingBottom: "10px",
    borderBottom: "1px solid #999",
  },

  logo: { width: 90 },

  reportTitle: { fontSize: 16, textAlign: "center" },
  textLabel: { fontWeight: 300, fontSize: 12, width: "150px" },
  textImportant: { fontWeight: "bold", fontSize: 12 },
  titleDetalle: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "left",
  },

  theader: {
    fontSize: 10,
    paddingTop: 4,
    flex: 1,
    color: COLORS.black,
    border: "1px solid #000",
    textAlign: "center",
  },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },

  viewFecha: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  formGridRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "300px",
    alignContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
});

const CarritoPedidoPDF: React.FC<PdfPreviewProps> = ({ data }) => {
  const Title = () => {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.reportTitle}>Salve</Text>
          </View>
        </View>
      </View>
    );
  };

  const Client = () => (
    <View style={styles.titleContainer}>
      <View>
        <View style={styles.flexColumn}>
          <View style={styles.formGridRow}>
            <Text style={styles.textLabel}>Proveedor:</Text>
            <Text style={styles.textImportant}>
              {capitalizeFirstLetter(data[0].proveedor)}
            </Text>
          </View>
          <View style={styles.formGridRow}>
            <Text style={styles.textLabel}>Actualizado al:</Text>
            <Text style={styles.textImportant}>{getFechaActual()}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 5 }}>
      <View style={styles.theader}>
        <Text>Articulo</Text>
      </View>
      <View style={styles.theader}>
        <Text>Cantidad</Text>
      </View>
      <View style={styles.theader}>
        <Text>Precio Unitario</Text>
      </View>
      <View style={styles.theader}>
        <Text>Total</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    data.map((list: List) => {
      return (
        <View style={{ width: "100%", flexDirection: "row" }} key={list._id}>
          <View style={styles.tbody}>
            <Text> {capitalizeFirstLetter(list.articulo)}</Text>
          </View>
          <View style={styles.tbody}>
            <Text style={{ textAlign: "center" }}>{list.cantidad}</Text>
          </View>
          <View style={styles.tbody}>
            <Text style={{ textAlign: "right", width: "50px" }}></Text>
          </View>
          <View style={styles.tbody}>
            <Text style={{ textAlign: "right" }}>
              $ {formatMoney(list.precioSinIva! * Number(list.cantidad!))}
            </Text>
          </View>
        </View>
      );
    });

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <Text
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} de ${totalPages}`
          }
          fixed
          style={{
            textAlign: "right",
            marginBottom: "10px",
            fontSize: 11,
            fontWeight: "bold",
          }}
        />

        <Title />
        <Client />

        <Text style={styles.titleDetalle}>Detalle:</Text>
        <TableHead />
        <TableBody />
      </Page>
    </Document>
  );
};

export default CarritoPedidoPDF;
