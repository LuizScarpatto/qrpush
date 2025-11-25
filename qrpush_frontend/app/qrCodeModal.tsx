import React, { useEffect, useState } from "react";
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

interface ModalScreenProps {
  visible: boolean;
  onClose: () => void;
  qrId: number | null;
  token: string;
}

export default function ModalScreen({ visible, onClose, qrId, token }: ModalScreenProps) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!qrId || !visible) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/qrcode/${qrId}/imagepng`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result as string); // base64 string
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Error fetching QR image:", err);
        setLoading(false);
      }
    };

    fetchImage();
  }, [qrId, visible, token]);

  if (!qrId) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            imageData && (
              <Image
                source={{ uri: imageData }}
                style={{ width: 250, height: 250 }}
                resizeMode="contain"
              />
            )
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: "#fff" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  closeButton: { marginTop: 20, backgroundColor: "#333", padding: 10, borderRadius: 5 },
});
