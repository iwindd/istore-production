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
import { OrderProduct } from "@prisma/client";
import { money, number } from "@/libs/formatter";

Font.register({
  family: "Sarabun",
  fonts: [
    { src: "/assets/fonts/THSarabun.ttf" },
    { src: "/assets/fonts/THSarabunItalic.ttf", fontStyle: "italic" },
    {
      src: "/assets/fonts/THSarabunBoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
    {
      src: "/assets/fonts/THSarabunBold.ttf",
      fontStyle: "bold",
      fontWeight: 700,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: "0.5in",
  },
  header: {
    alignItems: "center",
    marginBottom: '20px'
  },
  heading: {
    fontFamily: "Sarabun",
    fontStyle: "bold",
    fontSize: 40,
  },
  address: {
    fontFamily: "Sarabun",
    fontStyle: "italic",
    fontSize: 20,
  },
  text: {
    fontFamily: "Sarabun",
  },
  item: {
    fontFamily: "Sarabun",
  },
  caption: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  table: {
    display: "flex",
    flexDirection: "row",
  },
  itemRow: {
    display: "flex",
    flexDirection: "row",
    marginVertical: '1px'
  },
  row: {
    width: "20%",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: "5px",
  },
  row2: {
    width: "40%",
    paddingHorizontal: "5px",
  },
  row3: {
    width: "80%",
    paddingHorizontal: "5px",
  },
  divider: {
    width: "100%",
    borderBottom: "1px solid black",
  },
  wrapper: {
    marginTop: '20px',
    alignItems: "center",
  },
  heading2: {
    fontFamily: "Sarabun",
    fontSize: 20,
  },
});

export interface ReceiptProps {
  items: OrderProduct[];
  name: string;
  address: string;
  left: string;
  right: string;
}

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const Receipt = ({ name, address, left, right, items }: ReceiptProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={styles.caption}>
          <Text style={styles.text}>{left}</Text>
          <Text style={styles.text}>{right}</Text>
        </View>
        <Divider />
        <View style={styles.table}>
          <View style={styles.row2}>
            <Text wrap={false} style={styles.item}>ชื่อรายการ</Text>
          </View>
          <View style={styles.row}>
            <Text wrap={false} style={styles.item}>ราคา</Text>
          </View>
          <View style={styles.row}>
            <Text wrap={false} style={styles.item}>จำนวน</Text>
          </View>
          <View style={styles.row}>
            <Text wrap={false} style={styles.item}>รวม</Text>
          </View>
        </View>
        <Divider />
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.row2}>
              <Text style={styles.item}>{item.label}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.item}>
                {money(Math.floor(item.price / item.count))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.item}>{number(item.count)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.item}>{money(item.price)}</Text>
            </View>
          </View>
        ))}
        <Divider />
        <View style={styles.itemRow}>
          <View style={styles.row3}>
            <Text style={styles.item}>รวม</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}>
              {money(items.reduce((current, item) => current += item.price, 0))}
            </Text>
          </View>
        </View>
        <View style={styles.wrapper}>
        <Text style={styles.heading2}>* ขอบคุณ *</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Receipt;
