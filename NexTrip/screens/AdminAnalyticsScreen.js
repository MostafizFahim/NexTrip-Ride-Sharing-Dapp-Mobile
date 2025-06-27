import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { LineChart, PieChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");

// Dummy analytics data (replace with props/context/API later)
const metrics = {
  totalRides: 5423,
  totalUsers: 3312,
  totalDrivers: 817,
  revenue: 1284000, // BDT
};

const ridesPerWeek = [134, 175, 180, 210, 192, 220, 199];
const revenuePerWeek = [21000, 25000, 26700, 28500, 27600, 29100, 28200];
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const userRoles = [
  {
    name: "Passengers",
    count: 2495,
    color: "#43cea2",
    legendFontColor: "#222",
    legendFontSize: 13,
  },
  {
    name: "Drivers",
    count: 817,
    color: "#185a9d",
    legendFontColor: "#222",
    legendFontSize: 13,
  },
];

export default function AdminAnalyticsScreen() {
  // Simulate loading state if you want, or pull from context/props later
  // const loading = false;

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Platform Analytics</Text>
        {/* KPI Cards */}
        <View style={styles.kpiRow}>
          <KpiCard
            icon={<MaterialIcons name="commute" size={28} color="#185a9d" />}
            value={metrics.totalRides}
            label="Total Rides"
          />
          <KpiCard
            icon={<FontAwesome5 name="users" size={23} color="#43cea2" />}
            value={metrics.totalUsers}
            label="Users"
          />
          <KpiCard
            icon={<FontAwesome5 name="car-side" size={23} color="#185a9d" />}
            value={metrics.totalDrivers}
            label="Drivers"
          />
          <KpiCard
            icon={
              <MaterialIcons name="attach-money" size={27} color="#43cea2" />
            }
            value={`৳${(metrics.revenue / 1000).toFixed(1)}k`}
            label="Revenue"
          />
        </View>

        {/* Line Chart: Rides & Revenue */}
        <Text style={styles.chartTitle}>Rides & Revenue (Last 7 days)</Text>
        {ridesPerWeek.length && revenuePerWeek.length ? (
          <LineChart
            data={{
              labels: weekLabels,
              datasets: [
                {
                  data: ridesPerWeek,
                  color: (opacity = 1) => "#185a9d",
                  strokeWidth: 2,
                },
                {
                  data: revenuePerWeek.map((v) => v / 1000),
                  color: (opacity = 1) => "#43cea2",
                  strokeWidth: 2,
                },
              ],
              legend: ["Rides", "Revenue (kBDT)"],
            }}
            width={width > 400 ? 370 : width - 25}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(67,206,162,${opacity})`,
              labelColor: (opacity = 1) => "#888",
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#185a9d",
              },
              decimalPlaces: 0,
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noData}>No chart data available</Text>
        )}

        {/* Pie Chart: User Roles */}
        <Text style={styles.chartTitle}>User Roles Distribution</Text>
        <PieChart
          data={userRoles.map((r) => ({
            name: r.name,
            population: r.count,
            color: r.color,
            legendFontColor: r.legendFontColor,
            legendFontSize: r.legendFontSize,
          }))}
          width={width > 400 ? 370 : width - 25}
          height={168}
          chartConfig={{
            color: (opacity = 1) => `rgba(67,206,162,${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      </ScrollView>
    </LinearGradient>
  );
}

function KpiCard({ icon, value, label }) {
  return (
    <View style={styles.kpiCard}>
      {icon}
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 30,
    paddingHorizontal: 9,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 15,
    letterSpacing: 1,
  },
  kpiRow: {
    flexDirection: "row",
    width: "98%",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  kpiCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 11,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
    elevation: 3,
    minWidth: 74,
  },
  kpiValue: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
  },
  kpiLabel: {
    color: "#43cea2",
    fontSize: 12.2,
    fontWeight: "bold",
    marginTop: 1,
  },
  chartTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16.3,
    marginTop: 15,
    marginBottom: 7,
    letterSpacing: 0.7,
    alignSelf: "flex-start",
    marginLeft: 12,
  },
  chart: {
    borderRadius: 17,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  noData: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 15,
  },
});
