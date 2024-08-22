"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

// Register custom fonts
Font.register({
  family: "Sarabun",
  fonts: [
    { src: "/assets/THSarabun.ttf" },
    { src: "/assets/THSarabunBold.ttf", fontStyle: "bold" },
    { src: "/assets/THSarabunItalic.ttf", fontStyle: "italic" },
    {
      src: "/assets/THSarabunBoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "1in",
    paddingLeft: "1.5in",
    paddingTop: "0.2in",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  garuda: {
    width: "42px",
    height: "42px",
  },
  text: {
    fontFamily: "Sarabun",
    fontSize: "14px",
  },
  textBold: {
    fontFamily: "Sarabun",
    fontWeight: "bold",
  },
  heading: {
    fontFamily: "Sarabun",
    fontStyle: "bold",
    fontSize: "28px",
    textAlign: "right",
    flex: 1,
    paddingRight: "0.3in",
  },
  heading2: {
    fontFamily: "Sarabun",
    fontStyle: "bold",
    fontSize: "20px",
  },
  box: {
    border: "1px solid black",
    padding: "5px",
    width: "155px",
    height: "1.25in",
  },
  boxTitle: {
    fontFamily: "Sarabun",
    fontStyle: "bold",
  },
  flex: {
    flexDirection: "row",
    width: "100%",
    gap: "3px",
  },
  dotted: {
    flex: 1,
    borderBottom: "1 dashed black",
    marginBottom: "3px",
  },
  dotted2: {
    flex: 1,
    borderBottom: "1 dashed black",
    marginBottom: "5px",
    position: "relative",
  },
  dotText: {
    position: "absolute",
    bottom: "-2.5px",
    fontFamily: "Sarabun",
    fontSize: "14px",
  },
  typography: {
    textIndent: '1in',
    fontFamily: "Sarabun",
    fontSize: "16px",
    textAlign: 'justify',
  }
});

const texts = [
  `เรียน ผู้อำนวยการวิทยาลัยอาชีวศึกษาสุราษฎร์ธานี`,
  `ตามคำสั่งวิทยาลัยอาชีวศึกษาสุราษฎร์ธานีเลขที่ 520/2565 ลงวันที่ 2 มิถุนายน 2565 มอบหมายหน้าที่ให้คณะกรรมการดำเนินสหการร้านค้า วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี ดำเนินโครงการ ส่งเสริมผลิตผล การค้าและประกอบธุรกิจในสถานศึกษา เพื่อส่งเสริมให้ครู นักเรียน นักศึกษา และบุคลากรใน สถานศึกษาดำเนินการทำธุรกิจขนาดย่อม ประกอบอาชีพอิสระ รับงานการค้ารับจัดทำ รับบริการรับจ้างผลิต เพื่อจำหน่ายหารายได้ระหว่างเรียนและกิจกรรมสหการร้านค้าวิทยาลัยอาชีวศึกษาสุราษฎร์ธานี เพื่อสร้าง รายได้ให้สอดคล้องกับการเรียนการสอนและงานสหการร้านค้าของสถานศึกษานั้น`,
  `ในการนี้ข้าพเจ้า นางณัฐกาญจน์ เพราแก้ว ตำแหน่ง ครู ทำหน้าที่ คณะกรรมการฝ่ายจัด จำหน่าย มีหน้าที่ นำส่งเงินสดจากการจำหน่ายสินค้าสหการร้านค้าวิทยาลัยอาชีวศึกษาสุราษฎร์ธานี ประจำวันที่ ณ เวลา 14.00 น. รวมจำนวนเงินทั้งหมด`
]

// Create Document Component
const MonthReport = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.garuda} src="/assets/garuda.png" />
        <Text style={styles.heading}>บันทึกข้อความ</Text>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>ฝ่ายแผนงานและความร่วมมือ</Text>
          <View style={styles.flex}>
            <Text style={styles.text}>เลขที่รับ</Text>
            <View style={styles.dotted}></View>
          </View>
          <View style={styles.flex}>
            <Text style={styles.text}>วันที่</Text>
            <View style={styles.dotted}></View>
          </View>
          <View style={styles.flex}>
            <Text style={styles.text}>เวลา</Text>
            <View style={styles.dotted}></View>
          </View>
        </View>
      </View>
      <View style={styles.flex}>
        <Text style={styles.heading2}>ส่วนราชการ</Text>
        <View style={styles.dotted2}></View>
      </View>
      <View style={styles.flex}>
        <View style={styles.flex}>
          <Text style={styles.heading2}>ที่</Text>
          <View style={styles.dotted2}></View>
        </View>
        <View style={styles.flex}>
          <Text style={styles.heading2}>วันที่</Text>
          <View style={styles.dotted2}></View>
        </View>
      </View>
      <View style={styles.flex}>
        <Text style={styles.heading2}>เรื่อง</Text>
        <View style={styles.dotted2}>
          <Text style={styles.dotText}>
            ขอนำส่งเงินจากการจำหน่ายสินค้าสหการร้านค้าวิทยาลัยอาชีวศึกษาสุราษฎร์ธานี
          </Text>
        </View>
      </View>
      <View><Text style={styles.text}>{texts[0]}</Text></View>
      <View><Text style={styles.typography}>{texts[1]}</Text></View>
      <View><Text style={styles.typography}>{texts[2]}</Text></View>
    </Page>
  </Document>
);

export default MonthReport;
