import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";

import { date } from "../../helper/date";
import { getApi } from "../../helper/apiHelper";
import { useLocation, useParams } from "react-router-dom";
// Create styles

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
    paddingTop: '80px'
  },
});

// Create Document Component
function BasicDocument() {
  const { user, role } = useSelector(state => state.authReducer);
  const [mean, setMean] = useState(0);
  const params = useParams();
  const {state} = useLocation();

  if (role === 'faculty' || role === 'admin') {
    window.location.href = '*'
  }


  useEffect(() => {
    getApi(`/api/student-score/${params.id}`).then(res => {
      if(res.status === 200){
        if(res.data.data.percentage){
          setMean(res.data.data.percentage)
        }
      }
    })
  }, [])
  

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>

        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid black', color: 'gray' }}>
              E-Learning
            </Text>
            <Text style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', padding: '5px 0px', color: 'blue' }}>
              Certificate
            </Text>
          </View>

          <View style={{ ...styles.section }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Student Information</Text>
          </View>

          <View style={{ ...styles.row, ...styles.section }}>
            <Text style={{ width: '120px', color: 'gray', opacity: '0.8' }}>Name</Text>
            <Text>{user.first_name}</Text>
          </View>

          <View style={{ ...styles.row, ...styles.section }}>
            <Text style={{ width: '120px', color: 'gray', opacity: '0.8' }}>Surname</Text>
            <Text>{user.last_name}</Text>
          </View>

          <View style={{ ...styles.row, ...styles.section }}>
            <Text style={{ width: '120px', color: 'gray', opacity: '0.8' }}>Email</Text>
            <Text>{user.email}</Text>
          </View>

          <View style={{ ...styles.row, ...styles.section }}>
            <Text style={{ width: '120px', color: 'gray', opacity: '0.8' }}>Date</Text>
            <Text>{date()}</Text>
          </View>

          <View style={{ ...styles.row, ...styles.section }}>
            <Text style={{ width: '120px', color: 'gray', opacity: '0.8' }}>Course</Text>
            <Text>{state.courseName}</Text>
          </View>

          <View style={{ ...styles.row, ...styles.section }}>
            <Text style={{ width: '120px', color: 'gray', opacity: '0.8' }}>Result</Text>
            <Text>{`${mean}%`}</Text>
          </View>

        </Page>
      </Document>
    </PDFViewer>
  );
}
export default BasicDocument;