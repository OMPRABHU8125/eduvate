import React from 'react';
import { ArrowRight, Star, Clock, Target } from 'lucide-react';
import Getstarted from '../../../components/Getstarted';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <Icon className="feature-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Home = () => {
  const features = [
    {
      icon: Star,
      title: "Personalized Learning",
      description: "Get custom study plans tailored to your goals and learning style"
    },
    {
      icon: Clock,
      title: "Track Progress",
      description: "Monitor your achievements and stay motivated with real-time progress tracking"
    },
    {
      icon: Target,
      title: "Achievement System",
      description: "Earn rewards and badges as you complete learning milestones"
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EduVate</h1>
          <p>Level up your learning with personalized study plans and gamified experiences!</p>
          <div className="button-group">
            <Getstarted className="getstarted"/>
          </div>
          {/* <img
            src="/api/placeholder/800/400"
            alt="Learning illustration"
            className="hero-image"
          /> */}
        </div>
      </section>

      <section className="features-section section">
        <h2>Why Choose EduVate?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="cta-section section">
        <div className="cta-content">
          <h2>Ready to Transform Your Learning Journey?</h2>
          <p>Join thousands of students who are already experiencing the future of education.</p>
          <button className="primary-button">
            Start Learning Now
            <ArrowRight className="button-icon" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;