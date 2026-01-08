// src/pantallas/Dashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  // Simulación de datos (esto luego vendrá del backend)
  const [raffles, setRaffles] = useState([
    {
      id: 1,
      name: "Summer PS5 Giveaway",
      status: "Live",
      progress: 450,
      total: 500,
      raised: 4500,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDplCao2V_r0dbI87MC-vSXSmbtUUtxcUXV_5ApgqGQvrShd0wN7czEyFz25s40yRRJLcgYwIVOsOwHCvLuG-LKjUj7vBdb1PmySRtOXNtDGPCW1j0wxidgzS8wfoNeyWx24K2_k615oilBbm0nRIQXgB4E9JVaBLrj68bo9bKK-ZX90ASObToKaJDHqDZKf_c2Tqi4v0bG5e_mZA9bwdOz_DJ24XteXNqYnD57enRGSfprURoTGRMQLNvPOkxOQHiy30pMwfI8f-o"
    },
    {
      id: 2,
      name: "Monthly Cash Pot",
      status: "Ending Soon",
      progress: 892,
      total: 1000,
      raised: 8920,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcNbu1pnj_WsaypR0KNwF2vMLJVWHNyzy6S8zCRH3tM2Jyf7jrtgyFQEL477YCiuqicuAWAPG1HSDFAncO8ENSPczr5Ar2EfuBuicPHW1vBW9MyvqwMw1dooy75tBMFr54bkxiMicE7QdpfINInkmGUxE-wfJNNlUYmiC24divzfWJhCJVthpOOulGc6bLuFeDbzj2mE0nHtMM_XF_R9c7MzMvj-AbGLq03SDWcnvWcBKFEVOCmkH_dCfmuJZCp_6aKFJXLUnqRU8"
    }
  ]);

  const handleCreateRaffle = () => {
    navigation.navigate('CreateRaffle');
  };

  const handleDraw = () => {
    navigation.navigate('LiveDraw');
  };

  const handleBuyers = () => {
    navigation.navigate('Buyers');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Image
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDplCao2V_r0dbI87MC-vSXSmbtUUtxcUXV_5ApgqGQvrShd0wN7czEyFz25s40yRRJLcgYwIVOsOwHCvLuG-LKjUj7vBdb1PmySRtOXNtDGPCW1j0wxidgzS8wfoNeyWx24K2_k615oilBbm0nRIQXgB4E9JVaBLrj68bo9bKK-ZX90ASObToKaJDHqDZKf_c2Tqi4v0bG5e_mZA9bwdOz_DJ24XteXNqYnD57enRGSfprURoTGRMQLNvPOkxOQHiy30pMwfI8f-o" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Hello, Admin 👋</Text>
            <Text style={styles.subGreeting}>Welcome back</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Performance Section */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.performanceRow}>
            <Text style={styles.revenueAmount}>$12,450</Text>
            <View style={styles.trendBadge}>
              <Text style={styles.trendIcon}>↑</Text>
              <Text style={styles.trendText}>+15%</Text>
            </View>
          </View>
          <Text style={styles.revenueLabel}>Total Revenue this month</Text>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>📈 Chart would go here</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleCreateRaffle}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>➕</Text>
              </View>
              <Text style={styles.quickActionLabel}>New Raffle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleBuyers}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📊</Text>
              </View>
              <Text style={styles.quickActionLabel}>Top Buyers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard} onPress={handleDraw}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>▶️</Text>
              </View>
              <Text style={styles.quickActionLabel}>Live Draw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Raffles List */}
        <View style={styles.rafflesSection}>
          <View style={styles.rafflesHeader}>
            <Text style={styles.sectionTitle}>Active Raffles</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>
          {raffles.map((raffle) => (
            <View key={raffle.id} style={styles.raffleCard}>
              <View style={styles.raffleCardTop}>
                <View style={styles.raffleImageContainer}>
                  <Image
                    source={{ uri: raffle.image }}
                    style={styles.raffleImage}
                  />
                </View>
                <View style={styles.raffleInfo}>
                  <Text style={styles.raffleName}>{raffle.name}</Text>
                  <Text style={styles.raffleId}>ID: #{raffle.id}</Text>
                </View>
                <View style={[styles.statusBadge, raffle.status === 'Live' ? styles.statusLive : styles.statusEnding]}>
                  <Text style={styles.statusText}>{raffle.status}</Text>
                </View>
              </View>
              <View style={styles.raffleProgress}>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressValue}>{raffle.progress}<Text style={styles.progressTotal}>/{raffle.total}</Text></Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(raffle.progress / raffle.total) * 100}%` }]}>
                  </View>
                </View>
              </View>
              <View style={styles.raffleFooter}>
                <View style={styles.buyerAvatars}>
                  <Image
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQtpuSMIx95F5-XYuVNMnHhqMbPkcCTiqoC1t0vZGWDhSkwc8LhyPIOcxV4DeFnkQBmo5EYVgYyDR6Ow9N4U5p0gWHXhZL2m1QacHJlz9uNOtO96fAgWXmITLLKx2sW3f02ECdkxMpgUqt4GankBOXTEyTtnf4w1lhgza8x_OIugsivybBMB0JZMKRJx_xxX_euqGdgDbomioQeP_2mUbpK0g3yqhtcdcjPSXyblmX34-GDrWNgY6rCLUwdn2Ij986VDt5ZRfi83E" }}
                    style={styles.buyerAvatar}
                  />
                  <Image
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHSN2mSv9oNptgEHaGlNhD7-LLPcBsvodg17e-ASL7OHgQk9F2IkeGjv-lp6AQrheZEq3r5I89FqadjJl9R8WFVGgFPKyQGaP870836TyydDxdd4USV4qn_k8QWl7cZLTXIRFj0ILRV-8HvtvPZQoVBgAA31JxvRl4eVBskJY8yoqB66lMBb2LQp9K19HvA3yBIW-S0oXT4dp75OJHe9KsrTWyyd8GLcW2sArMLjuYD8zU_9iNPOZ4azku1tBCjHBywcn3PbgXacI" }}
                    style={styles.buyerAvatar}
                  />
                  <Image
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxTG2w8pR089epgQCx0Tlwj2o73PHpmJV55n6s02mHHCRy0vnEuDheD1XlnqXKftbHlhwzuursl6DU27ta2k2AqsyVuQ98VjPC-_P9AOYU4D0N4kawNlKTJhF3tXiFqsRLSEPyHfRRrFSr2ETuiwHDry_HTNzDupTqiRvAostRca5e9GLfvHJiEAP_hWWbr8EsbqWANkSdh5BKqqUxG6pALlx3EMtbi430uCtvbrFRV5Dw76hBQqQJyAdXopRGduAxCBZc3_vtrHs" }}
                    style={styles.buyerAvatar}
                  />
                  <View style={styles.buyerAvatarMore}>
                    <Text style={styles.buyerAvatarMoreText}>+12</Text>
                  </View>
                </View>
                <Text style={styles.raffleRaised}>
                  ${raffle.raised} <Text style={styles.raffleRaisedLabel}>raised</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Raffles')}>
          <Text style={styles.navIcon}>🎟️</Text>
          <Text style={styles.navLabel}>Raffles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fab, styles.navItem]} onPress={handleCreateRaffle}>
          <Text style={styles.fabIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Buyers')}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text style={styles.navLabel}>Buyers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8', // background-light
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f6f7f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#137fec',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subGreeting: {
    fontSize: 12,
    color: '#64748b',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  notificationIcon: {
    fontSize: 24,
    color: '#1e293b',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Espacio para el bottom nav
  },
  performanceSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 4,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'black',
    color: '#1e293b',
    letterSpacing: -0.033,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#ecfccb',
    borderColor: '#a3e635',
    borderWidth: 1,
  },
  trendIcon: {
    fontSize: 16,
    color: '#a3e635',
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#a3e635',
  },
  revenueLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  chartPlaceholder: {
    height: 180,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartPlaceholderText: {
    fontSize: 16,
    color: '#64748b',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickActionCard: {
    width: 140,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f1f5f9',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#137fec',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
  },
  quickActionIconText: {
    fontSize: 20,
    color: 'white',
  },
  quickActionLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  rafflesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  rafflesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#137fec',
  },
  raffleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  raffleCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  raffleImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  raffleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  raffleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  raffleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  raffleId: {
    fontSize: 12,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusLive: {
    backgroundColor: '#ecfccb',
    borderColor: '#a3e635',
  },
  statusEnding: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  raffleProgress: {
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  progressTotal: {
    fontSize: 14,
    color: '#64748b',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#137fec',
  },
  raffleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyerAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: -8,
  },
  buyerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  buyerAvatarMore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyerAvatarMoreText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  raffleRaised: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  raffleRaisedLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: 80,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: '#64748b',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#137fec',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  fabIcon: {
    fontSize: 28,
    color: 'white',
  },
});

export default Dashboard;