import db from '../video-services/db/postgres.js'; // Sesuaikan dengan path ke file database
import elasticClient from '../video-search-services/elastic/elasticClient.js'; // Sesuaikan dengan path ke file elastic client
import { v4 as uuidv4 } from 'uuid';

// Fungsi untuk membuat teks acak
const categories = [
  "Education",
  "Entertainment",
  "Music",
  "Sports",
  "Technology",
  "News",
  "Science",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Beauty",
  "Gaming",
  "Pets",
  "Animals",
  "History",
  "Politics",
  "Religion",
];

const uploaders = Array.from({ length: 10 }, (_, i) => `Uploader_${i + 1}`);

const thumbnails = [
  "https://i.ytimg.com/vi/TZcY2bwand0/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhjIFQoZTAP&rs=AOn4CLC1KNSuhBuLMGLn_B8gK9jNUpxwPg",
  "https://i.ytimg.com/vi/qkzjd5k2vUM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCVhink_INkgr1UxQ1eSioKU-cZdQ",
  "https://i.ytimg.com/vi/UPJcSkRs_XE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAxil-5NQjs8BE_FmjIaCLo_d4iug",
  "https://i.ytimg.com/vi/lWMlgX_1xdU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDsEDcWxaQ7G0UbYzMSXNm3gui0lg",
  "https://i.ytimg.com/vi/2cBHu2450TM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB2x-2aoGSeKXfmusJmdB19u_cp1A",
  "https://i.ytimg.com/vi/JfW7tg0yWsc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDftY_saivOa4Y7BbwiP6E4D9BQrg",
  "https://i.ytimg.com/vi/Q1qOaKKlUTs/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBvv_rCX72WKmkobO3ePI723zHxQg",
  "https://i.ytimg.com/vi/3ojvLexb4mM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCaImwcXwGAwgN6l_fnUgrgEp3Hvw",
  "https://i.ytimg.com/vi/ajRCfGZwVhM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB9K4SIkTZ-Dv5f_689_3HJNJJ96w",
  "https://i.ytimg.com/vi/8E_WMcSpayw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC7EyUcX-oIEY2bld4AZHeX0sxVdw",
  "https://i.ytimg.com/vi/SlTyP6SJwRI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBoLSomevUdrX-KJwnon5Zm3hNcLw",
  "https://i.ytimg.com/vi/YtvDJ1g5PsU/hq720.jpg?v=6731f284&sqp=CPS-yLkG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiLJo_VDgAvdTUFd-0QCHGJtDgZg",
  "https://i.ytimg.com/vi/fg72DS56lwE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCIhWO871KM_MSMkhazFkvw7ceMEQ",
  "https://i.ytimg.com/vi/Xu1wA7CfhQg/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYZSBcKFcwDw==&rs=AOn4CLCvyIEXSwJBMHcnZZYh6d75OLeOkA",
];

const videos = [
  "https://www.youtube.com/embed/qmgA_WejI8w?si=1exk98bEfqxkuvec",
  "https://www.youtube.com/embed/fLPS4sIpYh0?si=e1KgGHvYrIqOwSlK",
  "https://www.youtube.com/embed/bUxd3jqCr94?si=aQKBnu1iF3Akv1kH",
  "https://www.youtube.com/embed/lWMlgX_1xdU?si=Xq-lIqHBA3oQElGb",
  "https://www.youtube.com/embed/2cBHu2450TM?si=eLnISYriMe_jgJJ2",
];

const generateRandomText = () => {
  const phrases = [
    "Understanding Quantum Physics",
    "Exploring the Latest Gadgets",
    "Tips for a Healthy Lifestyle",
    "The Future of AI and Robotics",
    "Creative DIY Ideas",
    "Healthy Eating Habits",
    "The Benefits of Meditation",
    "The Art of Photography",
    "The Power of Mindfulness",
    "The Importance of Sleep",
    "Sustainable Living Habits",
    "Healthy Cooking Techniques",
    "The Science of Self-Development",
    "The Secrets of Successful Leadership",
    "The Power of Positive Thinking",
    "The Benefits of Yoga",
    "The Science of Human Behavior",
    "The Art of Writing",
    "Organizational Leadership",
    "The Science of Happiness",
    "Professional Networking",
    "Professional Development",
    "Professional Growth",
    "Organizational Culture",
    "Organizational Structure",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};

const cutRandomText = () => {
  const randomText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perferendis maxime ullam quas expedita voluptatem, nostrum, dolor blanditiis dolorem ex placeat incidunt atque maiores cupiditate, magni exercitationem veniam eius quia impedit quibusdam eaque eum. Incidunt nulla deserunt commodi obcaecati cum tenetur expedita quam? Sapiente quos laborum quod quisquam cum, delectus reprehenderit commodi earum impedit? Nesciunt perferendis, odio autem inventore dolorem totam repellendus minima incidunt porro reiciendis excepturi eos accusamus exercitationem vel commodi mollitia quis quidem, impedit sunt vitae ratione illo sit quos hic? Molestiae placeat dicta tenetur. Nesciunt deserunt, rerum consequatur ipsam quia repellat ab. Recusandae impedit perferendis error deserunt rem temporibus quae quisquam aliquam exercitationem. Possimus optio, dolorem iure saepe numquam non. Dolor ut accusantium necessitatibus aut! Optio necessitatibus earum doloribus, at qui maxime aliquam perspiciatis, tempora molestiae rem exercitationem dolor error voluptate. Doloribus praesentium, quas et voluptas adipisci laboriosam eveniet ad fugit debitis qui pariatur distinctio molestiae quaerat alias eligendi, quod quae saepe explicabo iure possimus. Possimus, laborum sit esse corrupti a inventore nisi illo, corporis dicta sapiente nobis enim deserunt, hic voluptatem maiores ipsam. Eveniet tempore dolores vel repudiandae ab vero saepe praesentium est amet earum. Eaque et numquam odit minus, laborum quam. Quibusdam, aliquam dolore doloribus non, explicabo perferendis eveniet in laborum sequi magnam culpa reiciendis ducimus. Eius minima recusandae doloribus ipsum culpa mollitia magni molestias at necessitatibus quam nostrum alias quaerat dicta cum odit, pariatur velit incidunt labore sed. Aspernatur ad optio numquam repellendus, reiciendis, delectus debitis distinctio molestias exercitationem qui nisi recusandae nesciunt nobis sequi dolores, autem dolor id! Deserunt obcaecati culpa id aliquid quisquam maxime quasi, ullam sapiente nam exercitationem iste suscipit aspernatur voluptatibus porro! Debitis ea vel quisquam eveniet consequuntur minima reiciendis vero beatae non perspiciatis, quo corporis, tempora tenetur sint assumenda? Sunt beatae molestiae laborum maxime consequatur, voluptatum deserunt recusandae nobis. Magnam, quibusdam deleniti a eum sunt obcaecati fuga eaque sed eos inventore, autem vero, delectus ut repellat sint quasi ullam laboriosam totam commodi dolor dolore laborum velit illo ducimus. Ducimus, veniam quod esse saepe nihil earum doloremque autem magni placeat qui unde voluptatum dolorem? Cum, assumenda? Natus quibusdam quam sapiente exercitationem minus aut sed doloremque reiciendis, dolores amet est officia earum nostrum quaerat accusamus commodi ad ducimus necessitatibus labore veniam. Sed rem facilis quos! Quo, facilis? Ducimus, corrupti natus perspiciatis iure omnis eveniet modi voluptatum nemo eum, blanditiis, voluptatibus accusamus quam eligendi et repellat. Quos maxime sit alias rem harum unde ex libero consectetur mollitia esse repellat, soluta veniam, quis sunt! Pariatur nostrum iste ipsam accusantium vero, assumenda illum delectus nihil ullam adipisci facere eum cumque temporibus aut quibusdam qui! Dicta aut nobis, tempora voluptas asperiores dignissimos fugit nam est illo culpa quidem libero rerum, velit officia consequuntur quisquam aliquam laudantium eaque voluptatum iusto quas facere quae explicabo. Repudiandae, blanditiis praesentium. Repellat quibusdam voluptatibus quo voluptates dicta quia illo rem tempora sint veniam, eum eveniet magnam obcaecati quod non molestias iste accusamus, similique eius ab. Dicta veniam quam accusamus soluta natus, laboriosam ipsam nostrum eos animi libero dolor ipsum! Veniam.";

  return randomText.substring(0, Math.floor(Math.random() * randomText.length + 10));
};

// Fungsi untuk membuat video data
const sampleVideos = Array.from({ length: 100 }, (_, i) => ({
  id: uuidv4(),
  title: generateRandomText(),
  videoUrl: videos[Math.floor(Math.random() * videos.length)],
  category: categories[Math.floor(Math.random() * categories.length)],
  uploader: uploaders[Math.floor(Math.random() * uploaders.length)],
  views: Math.floor(Math.random() * 10000000),
  likes: Math.floor(Math.random() * 5000000),
  uploadDate: new Date(
    2023,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ),
  thumbnailUrl: thumbnails[Math.floor(Math.random() * thumbnails.length)],
  description: `This is the description for Sample Video Title ${i + 1}. ${cutRandomText()}`,
}));

// Fungsi untuk mengisi data ke dalam database dan Elasticsearch
const seedDatabase = async () => {
  for (const videoData of sampleVideos) {
    const { id, title, description, thumbnailUrl, videoUrl, category, uploader } = videoData;

    // Insert data ke dalam SQL database
    await db.none(
      'INSERT INTO videos (id, title, description, thumbnail_url, video_url, category, uploader) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [id, title, description, thumbnailUrl, videoUrl, category, uploader]
    );

    // Index data ke dalam Elasticsearch
    try {
      const response = await elasticClient.index({
        index: 'videos',
        id,
        document: { ...videoData, views: 0, likes: 0, upload_date: new Date() }
      });
      console.log('Elasticsearch response:', response);
    } catch (error) {
      console.error('Elasticsearch error:', error);
    }
  }
};

seedDatabase()
  .then(() => {
    console.log("Seeding completed successfully");
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
  });
