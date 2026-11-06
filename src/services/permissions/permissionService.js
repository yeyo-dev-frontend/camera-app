import { Alert, Linking } from "react-native";

export async function ensurePermission(
  getPermission,
  requestPermission,
  explanation,
) {
  try {
    let status = await getPermission();
    if (!status.granted && status.canAskAgain)
      status = await requestPermission();
    if (status.granted) return true;
    Alert.alert(
      "Permiso necesario",
      explanation,
      status.canAskAgain
        ? [{ text: "Cerrar" }]
        : [
            { text: "Cerrar" },
            {
              text: "Abrir ajustes",
              onPress: () => {
                Linking.openSettings().catch(() =>
                  Alert.alert("Abre los ajustes de la app desde tu teléfono."),
                );
              },
            },
          ],
    );
  } catch {
    Alert.alert(
      "No se pudo comprobar el permiso",
      "Vuelve a intentarlo desde la app.",
    );
  }
  return false;
}
