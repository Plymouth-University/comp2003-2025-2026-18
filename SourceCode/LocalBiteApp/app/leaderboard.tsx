import { View, Text, StyleSheet, FlatList } from "react-native";

const leaderboardData = [
  { id: "1", name: "Alex", points: 120, badge: "👑 Food King" },
  { id: "2", name: "Maria", points: 95, badge: "🍜 Taste Master" },
  { id: "3", name: "John", points: 80, badge: "🍕 Rising Foodie" },
  { id: "4", name: "You", points: 70, badge: "☕ Coffee Explorer" },
  { id: "5", name: "Jamie", points: 60, badge: "🌮 Street Food Lover" },
  { id: "6", name: "Lina", points: 55, badge: "🍔 Burger Hunter" },
];

export default function Leaderboard() {

  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🏆 Leaderboard</Text>

      {/* Top 3 */}
      <View style={styles.topSection}>

        {/* Second */}
        <View style={styles.topCard}>
          <View style={[styles.avatarLarge, styles.silver]} />
          <Text style={styles.topName}>{topThree[1].name}</Text>
          <Text style={styles.badge}>{topThree[1].badge}</Text>
          <Text style={styles.points}>{topThree[1].points} pts</Text>
          <Text style={styles.medal}>🥈</Text>
        </View>

        {/* First */}
        <View style={styles.topCardMain}>
          <View style={[styles.avatarLarge, styles.gold]} />
          <Text style={styles.topName}>{topThree[0].name}</Text>
          <Text style={styles.badge}>{topThree[0].badge}</Text>
          <Text style={styles.points}>{topThree[0].points} pts</Text>
          <Text style={styles.medal}>🥇</Text>
        </View>

        {/* Third */}
        <View style={styles.topCard}>
          <View style={[styles.avatarLarge, styles.bronze]} />
          <Text style={styles.topName}>{topThree[2].name}</Text>
          <Text style={styles.badge}>{topThree[2].badge}</Text>
          <Text style={styles.points}>{topThree[2].points} pts</Text>
          <Text style={styles.medal}>🥉</Text>
        </View>

      </View>

      {/* Remaining users */}
      <FlatList
        data={others}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.rowCard,
              item.name === "You" && styles.youCard
            ]}
          >

            <Text style={styles.rank}>#{index + 4}</Text>

            <View style={styles.avatarSmall} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.badgeSmall}>{item.badge}</Text>
            </View>

            <Text style={styles.points}>{item.points}</Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f0a05",
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ff8c1a",
    textAlign: "center",
    marginBottom: 20,
  },

  /* TOP SECTION */

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  topCard: {
    width: "30%",
    backgroundColor: "#1a1208",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  topCardMain: {
    width: "34%",
    backgroundColor: "#1a1208",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff8c1a",
  },

  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },

  gold: { backgroundColor: "#FFD700" },
  silver: { backgroundColor: "#C0C0C0" },
  bronze: { backgroundColor: "#CD7F32" },

  medal: {
    fontSize: 20,
    marginTop: 4,
  },

  topName: {
    color: "#fff",
    fontWeight: "bold",
  },

  badge: {
    fontSize: 11,
    color: "#c9a27a",
    marginVertical: 2,
    textAlign: "center",
  },

  /* LIST */

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1208",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  youCard: {
    borderWidth: 2,
    borderColor: "#ff8c1a",
  },

  rank: {
    color: "#fff",
    width: 30,
    fontWeight: "bold",
  },

  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#c9a27a",
    marginHorizontal: 10,
  },

  name: {
    color: "#fff",
    fontWeight: "bold",
  },

  badgeSmall: {
    color: "#c9a27a",
    fontSize: 11,
  },

  points: {
    color: "#ff8c1a",
    fontWeight: "bold",
  },

});