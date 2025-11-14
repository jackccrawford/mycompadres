import React from 'react';
import { Modal, SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { privacyPolicyContent } from '../../data/homeText';

export interface PrivacyModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: theme.colors.background }]}>  
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.outline }]}>  
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Privacy Policy</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={{ fontSize: 24, color: theme.colors.onSurface }}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.modalScrollViewContent}>
              <Text style={[styles.modalText, { color: theme.colors.onSurface }]}>{privacyPolicyContent}</Text>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalSafeArea: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  modalView: {
    width: '100%',
    maxHeight: '90%',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  closeButton: { padding: 5, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  modalScrollView: { width: '100%' },
  modalScrollViewContent: { padding: 16 },
  modalText: { fontSize: 14, lineHeight: 20, marginBottom: 10 },
});
