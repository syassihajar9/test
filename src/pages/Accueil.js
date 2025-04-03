import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Pour la navigation

function Accueil() {
  const navigate = useNavigate(); // Hook pour rediriger vers la page des recommandations

  // Fonction pour rediriger vers la page des recommandations
  const goToRecommendations = () => {
    navigate("/recommandations");
  };

  return (
    <div style={styles.container}>
      {/* Contenu principal */}
      <Container className="text-center text-white d-flex align-items-center justify-content-center" style={styles.overlay}>
        <Row>
          <Col md={12}>
            <h1 className="display-4">Bienvenue à Marrakech !</h1>
            <p className="lead">Découvrez les meilleures activités, hôtels et restaurants adaptés à votre budget.</p>
            <Button variant="danger" onClick={goToRecommendations} size="lg">
              Découvrez nos recommandations
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const styles = {
  container: {

    backgroundImage: "url('/images/HAJAR.jpg')",
// Image d'arrière-plan
    backgroundSize: "cover", // S'assurer que l'image couvre toute la zone
    backgroundPosition: "center", // Centrer l'image
    backgroundAttachment: "fixed", // Fixer l'image lors du scroll
    height: "100vh", // Toute la hauteur de l'écran
    width: "100vw", // Toute la largeur de l'écran
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Ombre noire semi-transparente pour améliorer la lisibilité
    padding: "50px",
    minHeight: "100vh", // S'assurer que le contenu reste centré même si l'image est grande
    width: "100%", // Adapter au conteneur parent
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Accueil;
