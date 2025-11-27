import { Redirect } from "expo-router";

export default function Index() {
  // Redireciona para a tela de cadastro por padrão
  // Altere para "/home" ou "/(auth)/login" conforme necessário
  return <Redirect href="/register" />;
}
