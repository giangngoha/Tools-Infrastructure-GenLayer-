# Intelligent Contracts Studio v2.5

**Intelligent Contracts Studio** is a specialized Integrated Development Environment (IDE) designed to simplify the construction, testing, and deployment of next-generation Smart Contracts. These contracts are capable of direct interaction with real-world data through a high-security Oracle system.

## Key Features

* **Standard Contract Libraries:** Out-of-the-box templates for:
  * **Weather Oracle:** Weather-based insurance triggered by OpenWeather precipitation data.
  * **Price Feeds:** Multi-source cryptocurrency price aggregation (Binance, Coinbase).
  * **Social Media Verifier:** Proof-of-post validation for social rewards (X/Twitter).

* **Secure Oracle Pattern:** Implements a robust Request-Response architecture that completely decouples off-chain API execution from on-chain state changes, ensuring data integrity.

* **Secure Key Vault:** A dedicated service for managing sensitive API secrets. Keys are never stored on-chain and are only accessible within secure execution environments.

* **Real-time Simulation Engine:** An integrated console providing detailed logs of the contract lifecycle, from initial request emission to oracle fulfillment.

* **Modern Studio UX:** A professional developer interface built with React and Tailwind CSS (v4), featuring code editing, live status monitoring, and metadata management.

## Security Architecture

The project leverages **Trusted Execution Environments (TEE)** patterns combined with an Oracle mesh to ensure:

1. API Keys are never exposed in plaintext on the blockchain.
2. Data validity is verified via multi-source aggregation.
3. Execution guards prevent unauthorized state transitions.

## Tech Stack

* **Frontend:** React.js, Tailwind CSS (v4)
* **Icons:** Lucide React
* **Bundler:** Vite
* **Environment:** GitHub Codespaces / Vercel

## Installation and Usage

To run this project in your local environment or GitHub Codespaces:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/USERNAME/intelligent-contracts-studio.git](https://github.com/USERNAME/intelligent-contracts-studio.git)
   cd intelligent-contracts-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Contribution

This project is submitted under the **Tools & Infrastructure** category. Our mission is to provide the necessary tooling for the developer community to adopt Intelligent Contracts safely and efficiently.

Feel free to open an Issue or create a Pull Request for any suggestions or improvements.
