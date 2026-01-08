// src/pantallas/CreateRaffle.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, Pressable, Switch, Modal, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const CreateRaffle = () => {
  const navigation = useNavigation();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8', // bg-background-light
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
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
});

export default CreateRaffle;