// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, Pressable, Switch, Modal, Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

// --- Pantalla Dashboard ---
const Dashboard = ({ navigation }) => {
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
              <Text style={styles.quickActionLabel}>New Rifa</Text>
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

// --- Pantalla CreateRaffle ---
const CreateRaffle = ({ navigation }) => {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tecnología', // Valor por defecto
    type: 'Physical', // Valor por defecto
    description: '',
    ticketPrice: '',
    quantity: '',
    closingDate: new Date(), // Valor por defecto
    status: 'Draft', // Valor por defecto
    imageUri: null, // Almacenará la URI de la imagen subida
    // Campos de Pago
    bankTransferEnabled: false,
    bankName: '',
    accountNumber: '',
    mobilePaymentEnabled: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const categories = ['Tecnología', 'Electrónicos', 'Vehículos', 'Efectivo', 'Inmuebles', 'Viajes', 'Otros'];
  const types = ['Physical', 'Digital', 'Service'];
  const statuses = ['Draft', 'Active', 'Paused'];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.closingDate;
    setShowDatePicker(false);
    handleChange('closingDate', currentDate);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar la rifa (enviar a la API)
    console.log('Formulario enviado:', formData);

    // Validación simple
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Por favor ingrese el nombre del premio.');
      return;
    }
    if (!formData.ticketPrice || parseFloat(formData.ticketPrice) <= 0) {
      Alert.alert('Error', 'Por favor ingrese un precio de ticket válido.');
      return;
    }
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      Alert.alert('Error', 'Por favor ingrese una cantidad de tickets válida.');
      return;
    }

    Alert.alert('Éxito', 'Rifa guardada correctamente.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
    // En una implementación real, llamarías a una función para enviar formData al backend
  };

  const handleImageUpload = () => {
    // En una app real, usarías react-native-image-picker o expo-image-picker
    // Por ahora, simulamos la subida con una imagen de ejemplo
    Alert.alert(
      'Subir Imagen',
      '¿Deseas usar una imagen de ejemplo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: () => {
            // Simula la subida de una imagen
            handleChange('imageUri', 'https://via.placeholder.com/600x400.png?text=Premio+Imagen');
            Alert.alert('Imagen', 'Imagen de ejemplo asignada.');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear Rifa</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/* Sección: Imagen del Premio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Imagen del Premio</Text>
        <Pressable style={styles.imageUploadContainer} onPress={handleImageUpload}>
          {formData.imageUri ? (
            <Image source={{ uri: formData.imageUri }} style={styles.uploadedImage} />
          ) : (
            <>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIcon}>📷</Text>
              </View>
              <Text style={styles.uploadText}>Subir Foto del Premio</Text>
              <Text style={styles.uploadHint}>Toca para navegar por la galería</Text>
            </>
          )}
        </Pressable>
      </View>

      {/* Sección: Detalles del Premio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalles del Premio</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Premio</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            placeholder="e.g. iPhone 15 Pro Max"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Categoría</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowCategoryModal(true)}>
              <Text style={styles.pickerButtonText}>{formData.category}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Tipo</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTypeModal(true)}>
              <Text style={styles.pickerButtonText}>{formData.type}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Describe el premio, condiciones, etc..."
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      {/* Sección: Reglas & Economía */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reglas & Economía</Text>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Precio del Ticket</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.input, styles.priceInput]}
                value={formData.ticketPrice}
                onChangeText={(value) => handleChange('ticketPrice', value)}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput
              style={styles.input}
              value={formData.quantity}
              onChangeText={(value) => handleChange('quantity', value)}
              placeholder="100"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha de Cierre</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>
              {formData.closingDate.toLocaleDateString()}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.closingDate}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Estado</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setShowStatusModal(true)}>
            <Text style={styles.pickerButtonText}>{formData.status}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sección: Métodos de Pago */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métodos de Pago</Text>

        <View style={styles.paymentMethodContainer}>
          <View style={styles.paymentMethodHeader}>
            <View style={styles.paymentMethodInfo}>
              <View style={styles.paymentIconContainer}>
                <Text style={styles.paymentIcon}>🏦</Text>
              </View>
              <View>
                <Text style={styles.paymentMethodName}>Transferencia Bancaria</Text>
                <Text style={styles.paymentMethodSubtext}>Depósito directo</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#137FEC" }}
              thumbColor={formData.bankTransferEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => handleChange('bankTransferEnabled', value)}
              value={formData.bankTransferEnabled}
            />
          </View>
          {formData.bankTransferEnabled && (
            <View style={styles.paymentDetails}>
              <TextInput
                style={styles.input}
                value={formData.bankName}
                onChangeText={(value) => handleChange('bankName', value)}
                placeholder="Nombre del Banco"
              />
              <TextInput
                style={styles.input}
                value={formData.accountNumber}
                onChangeText={(value) => handleChange('accountNumber', value)}
                placeholder="Número de Cuenta"
              />
            </View>
          )}
        </View>

        <View style={styles.paymentMethodContainer}>
          <View style={styles.paymentMethodHeader}>
            <View style={styles.paymentMethodInfo}>
              <View style={styles.paymentIconContainer}>
                <Text style={styles.paymentIcon}>📱</Text>
              </View>
              <View>
                <Text style={styles.paymentMethodName}>Pago Móvil</Text>
                <Text style={styles.paymentMethodSubtext}>Zelle, CashApp, etc.</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#137FEC" }}
              thumbColor={formData.mobilePaymentEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => handleChange('mobilePaymentEnabled', value)}
              value={formData.mobilePaymentEnabled}
            />
          </View>
        </View>
      </View>

      {/* Botón de Guardar (Sticky Footer) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Rifa</Text>
        </TouchableOpacity>
      </View>

      {/* Modales para Pickers */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCategoryModal}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.modalOption}
                onPress={() => {
                  handleChange('category', cat);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{cat}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowCategoryModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showTypeModal}
        onRequestClose={() => setShowTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Tipo</Text>
            {types.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.modalOption}
                onPress={() => {
                  handleChange('type', type);
                  setShowTypeModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowTypeModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showStatusModal}
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Estado</Text>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                style={styles.modalOption}
                onPress={() => {
                  handleChange('status', status);
                  setShowStatusModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{status}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowStatusModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// --- Estilos Comunes ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8', // bg-background-light
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f6f7f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    fontSize: 18,
    color: '#1e293b',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  cancelButton: {
    fontSize: 16,
    color: '#ef4444', // rojo para cancelar
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff', // bg-white
    borderWidth: 1,
    borderColor: '#cbd5e1', // border-gray-300
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  priceInput: {
    paddingLeft: 32, // Espacio para el símbolo de moneda
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff', // bg-white
    borderWidth: 1,
    borderColor: '#cbd5e1', // border-gray-300
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#1e293b',
  },
  calendarIcon: {
    fontSize: 20,
    color: '#64748b',
  },
  pickerButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff', // bg-white
    borderWidth: 1,
    borderColor: '#cbd5e1', // border-gray-300
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#1e293b',
  },
  paymentMethodContainer: {
    marginBottom: 16,
    backgroundColor: '#e2e8f0', // bg-surface-light
    borderRadius: 16,
    padding: 16,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe', // bg-blue-100
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 20,
    color: '#137fec', // text-blue-600
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  paymentMethodSubtext: {
    fontSize: 12,
    color: '#64748b',
  },
  paymentDetails: {
    paddingLeft: 52, // Espacio para el icono
  },
  footer: {
    padding: 20,
    backgroundColor: '#f6f7f8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  saveButton: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#137fec', // bg-primary
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancelButton: {
    paddingVertical: 12,
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: '600',
  },
  // Añadir estilos para los componentes de CreateRaffle si no están ya
  imageUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#e2e8f0', // bg-surface-light
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#94a3b8', // border-gray-400
    minHeight: 150,
  },
  uploadedImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },
  uploadIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#137fec',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadIcon: {
    fontSize: 24,
    color: 'white',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  uploadHint: {
    fontSize: 12,
    color: '#64748b',
  },
});

// --- Configuración de Navegación ---
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="CreateRaffle" component={CreateRaffle} options={{ headerShown: false }} />
        {/* Añade más pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;