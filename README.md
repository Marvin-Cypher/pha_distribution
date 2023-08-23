# PHA Distribution Graph

This project visualizes the PHA (Phala Network's token) distribution over time, following a specific halving schedule as part of the Gemeni Tokenomics for compute reward including both Phala and Khala tokens.

<img width="1221" alt="截屏2023-08-23 23 53 38" src="https://github.com/Marvin-Cypher/pha_distribution/assets/57211675/3fa465a3-a807-45db-83a7-27a4966c374e">

## Features

- A line graph that displays daily rewards based on a specific halving algorithm.
- Interactive tooltip that shows the exact reward amount for a specific day upon hover.
- Neat visual elements and design, with a focus on user experience.

## Setup & Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Open the `index.html` file in your browser.

## Dependencies

- D3.js: For creating and manipulating the graph.

## How It Works

The graph models the token distribution of PHA over a ten-year period. 
Every 180 days, the daily rewards decrease, representing a "halving" in the context of blockchain token distribution: https://docs.phala.network/compute-providers/basic-info/worker-rewards

|                    | Phala / Khala    |
| ------------------ | ---------------- |
| Relaychain         | Polkadot/ Kusama |
| Budget for Mining  | 700 mln          |
| Halving Period     | 180 days         |
| Halving Discount   | 25%              |
| Treasure Share     | 20%              |
| First Month Reward | 21.6 mln         |

The rewards and days are computed and then plotted using D3.js to provide a visual representation.



## Contribution

Interested in contributing? Check out our `CONTRIBUTING.md` for guidelines.

## License

This project is open source, under the [MIT License](LICENSE).
