import React from 'react';
import Navigation from '../../components/layout/Navigation';
import styles from '../../styles/pages/privacy/Privacy.module.css';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className={styles.privacyContainer}>
        <div className={styles.privacyBackground}>
          <div className={styles.privacyOverlay}></div>
        </div>
        
        <div className={styles.privacyContent}>
          <div className={styles.privacyHeader}>
            <h1 className={styles.privacyTitle}>Privacy Policy & Terms</h1>
            <p className={styles.privacySubtitle}>
              Your privacy is important to us. This policy explains how we collect, use, and protect your information, along with the terms of using our service.
            </p>
            <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className={styles.privacySections}>
            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Important Disclaimer</h2>
              <div className={styles.disclaimerBox}>
                <p className={styles.disclaimerText}>
                  <strong>TrueMate operates as a digital platform that facilitates connections between individuals. We provide the technology and space for users to interact, but we are not responsible for user actions, decisions, or outcomes resulting from these interactions.</strong> 
                </p>
                <p className={styles.disclaimerText}>
                  <strong>User Responsibility:</strong> Users are solely responsible for verifying information, ensuring their safety, and making their own decisions about interactions and relationships formed through our platform.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>Platform Limitation:</strong> We do not conduct background checks, verify user identities, or guarantee the accuracy of information provided by users. All interactions are at your own risk.
                </p>
                <p className={styles.disclaimerText}>
                  <strong>No Professional Services:</strong> TrueMate is not a counseling service, dating agency, or mental health provider. We do not offer professional therapeutic services or relationship advice.
                </p>
              </div>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Information We Collect</h2>
              <div className={styles.contentBlock}>
                <h3 className={styles.subsectionTitle}>Personal Information</h3>
                <ul className={styles.list}>
                  <li>Name and email address</li>
                  <li>Age and gender</li>
                  <li>Location information (general area)</li>
                  <li>Profile photos and bio information</li>
                  <li>Preferences and interests</li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.subsectionTitle}>Usage Data</h3>
                <ul className={styles.list}>
                  <li>App usage patterns</li>
                  <li>Interaction data (matches, messages, likes)</li>
                  <li>Device information</li>
                  <li>IP address and access logs</li>
                </ul>
              </div>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
              <ul className={styles.list}>
                <li>To provide and maintain our counseling platform service</li>
                <li>To match users based on compatibility and preferences</li>
                <li>To facilitate communication between users</li>
                <li>To improve our services and user experience</li>
                <li>To ensure platform safety and prevent misuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Data Sharing and Disclosure</h2>
              <p className={styles.sectionText}>
                We do not sell your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className={styles.list}>
                <li>With other users as necessary for the service to function (e.g., showing your profile to potential matches)</li>
                <li>With service providers who assist in operating our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>To prevent fraud or ensure platform safety</li>
              </ul>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>User Responsibility</h2>
              <div className={styles.responsibilityBox}>
                <p className={styles.sectionText}>
                  As a user of TrueMate, you acknowledge and agree that:
                </p>
                <ul className={styles.list}>
                  <li>You are responsible for verifying the authenticity of other users</li>
                  <li>You should exercise caution when sharing personal information</li>
                  <li>You are solely responsible for your interactions and decisions</li>
                  <li>You should not rely solely on our platform for important life decisions</li>
                  <li>You understand that matches and connections are not guaranteed to be successful</li>
                </ul>
              </div>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Data Security</h2>
              <p className={styles.sectionText}>
                We implement reasonable security measures to protect your information, but no method of transmission over the internet is 100% secure. 
                We cannot guarantee absolute security of your data.
              </p>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Your Rights</h2>
              <ul className={styles.list}>
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of certain data collection</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>No Professional Services</h2>
              <div className={styles.warningBox}>
                <p className={styles.sectionText}>
                  <strong>Important:</strong> TrueMate is not a licensed counseling service or dating agency. 
                  We do not provide professional psychological, therapeutic, or relationship counseling. 
                  For professional mental health services, please consult licensed professionals.
                </p>
              </div>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Agreement to Terms</h2>
              <p className={styles.sectionText}>
                By accessing and using TrueMate, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>User Conduct</h2>
              <p className={styles.sectionText}>
                You agree not to:
              </p>
              <ul className={styles.list}>
                <li>Create fake or misleading profiles</li>
                <li>Harass, abuse, or threaten other users</li>
                <li>Share explicit or inappropriate content</li>
                <li>Attempt to obtain personal information for malicious purposes</li>
                <li>Use the platform for commercial activities</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
              <div className={styles.liabilityBox}>
                <p className={styles.sectionText}>
                  <strong>Maximum Extent Permitted by Law:</strong> TrueMate shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                  resulting from your use of the platform, including but not limited to:
                </p>
                <ul className={styles.list}>
                  <li>Emotional distress or psychological harm</li>
                  <li>Financial losses or damages</li>
                  <li>Physical harm or injury</li>
                  <li>Reputational damage</li>
                  <li>Loss of opportunities</li>
                  <li>Any other damages arising from user interactions</li>
                </ul>
              </div>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Account Termination</h2>
              <p className={styles.sectionText}>
                We reserve the right to suspend or terminate your account at any time for violations of these terms, inappropriate behavior, or any other reason we deem necessary. 
                You may also delete your account at any time through the app settings.
              </p>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Age Requirement</h2>
              <p className={styles.sectionText}>
                You must be at least 18 years old to use TrueMate. By using our service, you confirm that you meet this age requirement. 
                We reserve the right to verify user age and suspend accounts that violate this requirement.
              </p>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Governing Law</h2>
              <p className={styles.sectionText}>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which TrueMate operates, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
              <p className={styles.sectionText}>
                We may update this privacy policy from time to time. We will notify users of significant changes 
                through the app. Your continued use of the service constitutes acceptance of any changes.
              </p>
            </section>

            <section className={styles.privacySection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <p className={styles.sectionText}>
                For questions about this policy or our platform, please use our contact form.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
