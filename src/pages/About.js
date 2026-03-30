import React from 'react';
import { Layout } from '../layouts/Layout';

export default function About() {
  return (
    <Layout>
      <div className="page-about">
        <div className="container">


          <div className="page-about-body">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="about-body-content">
                  <h1>About Weatherfully</h1>
                  <p>
                    Weatherfully is your go-to weather web application providing accurate,
                    real-time weather information and forecasts for locations around the world.
                  </p>

                  <h1>Our Mission</h1>
                  <p>
                    We aim to deliver reliable weather data with an intuitive, user-friendly
                    interface that helps you plan your day with confidence.
                  </p>

                  <h1>Features</h1>
                  <p>Real-time weather updates &bull; Extended weather forecasts &bull; Location-based weather tracking &bull; Detailed weather metrics &bull; Clean, responsive design</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
