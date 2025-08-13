import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Logo } from "../../../../assets/export";

// 1. Define styles
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  section: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionBold: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    fontWeight: "bold",
    color: "#29ABE2",
  },
});

// 2. PDF Document
const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src={Logo} />
        <Text style={styles.companyName}>Pain Relief USA</Text>
      </View>

      {/* Title */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Invoice Detail
      </Text>

      {/* Info Rows */}
      <View style={styles.section}>
        <Text>Status:</Text>
        <Text>{invoiceData?.status}</Text>
      </View>

      <View style={styles.section}>
        <Text>Subscription Plan</Text>
        <Text>{invoiceData?.planName}</Text>
      </View>

      <View style={styles.section}>
        <Text>Plan Category</Text>
        <Text>Individual</Text>
      </View>

      <View style={styles.section}>
        <Text>Total Employees</Text>
        <Text>{invoiceData?.employeeCount}</Text>
      </View>

      <View style={styles.section}>
        <Text>Cost Per Employee</Text>
        <Text>${invoiceData?.amountPerEmployee}</Text>
      </View>

      {/* Total */}
      <View style={styles.sectionBold}>
        <Text>Total Amount</Text>
        <Text>${invoiceData?.totalTransaction}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
