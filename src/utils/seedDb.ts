import Product from "../models/product.model";
import { connectDb } from "./connectDb";
import config from "config";
const products = [
  {
    name: "Protocol Drone - Dura HD Drone",
    description: `FLY DURA: The Dura HD Drone takes every flight to the next level and is a perfect flier for every skill level. Remote controlled with three adjustable speeds, banked turns and dynamic tricks are more functional than ever. 6-axis motion-sensitive auto stabilizers keep your movements swift and confident—every time
    SHARE YOUR FLIGHT: Capture every stunning moment in the air. This sleek, rechargeable camera drone takes 720p HD video and breathtaking still photos simultaneously wherever you are. Connect your Dura HD Drone to Wi-Fi, and download a smartphone app to enable live streaming and share out your exciting flight views`,
    price: 154,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660576415x197366753850694900%2F51T6OAf9cPL._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660581284x732462542993799700%2F51g2nTAGBYL._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660581318x962758714551591700%2F515JfRJeMqL._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660582297x197230700408910880%2F51CUE2zNk6L._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Drones",
  },
  {
    name: "Drone with 6K Camera for Adults, RC FPV GPS ",
    description: `[6K camera + 5G WIFI image transmission]GPS drone equipped with 6K HD camera can capture incredible photo clarity; 110° adjustable angle can provide a wider field of view. You can also directly and easily share it on social media from the App page
    [5G Wifi image transmission + 2000m flight]drone has advanced 5G Wifi technology, the transmission picture is smooth and clear, which can ensure that the beautiful scene is sent back to the mobile phone, and the high-definition picture can be watched in real time through the mobile phone`,
    price: 199,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660545701x624657186335100400%2F51uDfcg%252BfHL._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660549585x623518304822683400%2F41OUCiBA8LL._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Drones",
  },
  {
    name: "Voyage Palm Sized High Performance Drone, Silver",
    description: `Air pressure sensor locks flight altitude
      6 axis gyro for extremely stable flight and maneuverability
      New training mode helps beginner pilots learn how to fly
      Automatically starts and lands with the push of a button
      3 different speed settings for slow to high speed flying`,
    price: 399,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660454346x935030385701573800%2F51ZRoLErfsL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660461976x578993986400031100%2F61%252BN65gRnDL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660461355x935892317912019600%2F61kpfAzIGYL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Drones",
  },
  {
    name: "DJI Mini SE - Camera Drone with 3-Axis Gimbal",
    description: `Details
      Light as a Smartphone - Weighing less than 0 55lbs / 249 grams, DJI Mini SE is roughly the same weight as the smartphone. In the United States and Canada, you can fly this camera drone without the need to register your drone with the local government.
      Capture on the Go - The lightweight and powerful DJI Mini SE camera drone is the ideal for creators on the move. The ultra-portable design allows you to effortlessly capture moments in unforgettable ways.`,
    price: 299,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660414266x499737856866137500%2F51TEcohAqHS._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660419759x912455701994071300%2F61WKUF3y9qL._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651660418547x507512638357525700%2F719%252BudIpdqS._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Drones",
  },
  {
    name: "Samsung Galaxy Tab A8 (Silver)",
    description: `A Screen Everyone Will Love: Whether your family is streaming or video chatting with friends, the Galaxy Tab A8 tablet brings out the best in every moment on a 10.5" LCD screen
    Power and Storage for All: Get the power, storage and speed your family needs with an upgraded chipset and plenty of room to keep files — up to 128GB of storage; A long-lasting battery lets you go unplugged for hours to keep the family fun going`,
    price: 199,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657992332x518536936525000300%2F61fV4UeHeLL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651658003906x373956681115281000%2F415TupYINrL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651658000580x155449974535461380%2F61hCsSScMxL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Tablets",
  },
  {
    name: "2021 Apple 10.2-inch iPad (Wi-Fi, 64GB) (Space Gray)",
    description: `Gorgeous 10.2-inch Retina display with True Tone
    A13 Bionic chip with Neural Engine
    8MP Wide back camera, 12MP Ultra Wide front camera with Center Stage
    Up to 256GB storage
    Stereo speakers Touch ID for secure authentication and Apple Pay
    802.11ac Wi-Fi Up to 10 hours of battery life`,
    price: 229,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657615341x749230891719299800%2F61NGnpjoRDL._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657619998x838537026015274000%2F61JamrBdMSL._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657624325x916656953995956100%2F81%252Bh4mcrL0L._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Tablets",
  },
  {
    name: "Microsoft Surface Pro LTE",
    description: `Intel Core i5 i5-7300U Dual-core Processor (2 Core, 2.60 GHz) / 8GB RAM / Intel HD Graphics 620 / 256GB SSD storage
    12.3-inch PixelSense touch-screen display (2736 x 1824) / LTE supported
    8MP rear webcam resolution / 5MP front camera / Wireless Communication Technology, Wi-Fi
    microSDXC, microSD, microSDHC Supported / Windows 10 Pro
    Dimensions: 11.5 x 0.33 x 7.93 inch / Weight: 1.70 lbs`,
    price: 499,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657896976x157338331416956300%2F61RI4MoDGkL._AC_SL1200_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657900121x730151742534540500%2F61775QpK7eL._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651657903703x777541505430886800%2F51HOvd0ug5L._AC_SL1000_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Tablets",
  },
  {
    name: "SAMSUNG Galaxy Book2 Pro Laptop Computer (Graphite)",
    description: `POWERFUL, FAST, AMAZING: Our new laptop is packed with the premium performance you’ve come to expect from Samsung — plus some; It’s powered by the latest 12th Gen Evo-certified Intel processor, our most powerful available CPU yet
    THIN, LIGHT, POWERFUL: With a PC this powerful, you’ll want to take it with you wherever you go; And you can! At less than 2 pounds, Galaxy Book2 Pro is our thinnest and lightest laptop yet`,
    price: 999,
    images: [
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651658284405x485637714479404400%2F81Dkq05QIcL._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651658298365x667103406052432400%2F51K89tRSi-L._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F526bff719555f5e471677463b613de85.cdn.bubble.io%2Ff1651658298366x728159446017059700%2F512kUZCjz4L._AC_SL1500_.jpg?w=1024&h=1060&auto=compress&dpr=2&fit=max",
    ],
    category: "Laptops",
  },
];

const seedDb = async () => {
  try {
    console.log("Seeding database...");
    const mongoUrl: string = config.get<string>("mongoUrl");
    await connectDb(mongoUrl);
    await Product.deleteMany();

    await Product.insertMany(products);
    console.log("Seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

seedDb();
