import React from 'react';

const Bloggers = () => {
  const bloggers = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Lead Designer",
      bio: "Crafting beautiful interfaces and sharing my journey in the world of UX/UI design. I believe in minimalism and high-impact visuals.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 24, followers: "1.2k" }
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      bio: "JavaScript enthusiast. I write about modern web technologies, React, and how to build scalable backend systems.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 42, followers: "3.5k" }
    },
    {
      id: 3,
      name: "Jordan Smith",
      role: "Lifestyle Blogger",
      bio: "Exploring the intersection of productivity, mental health, and modern living. Join me as I navigate the complexities of life.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 15, followers: "800" }
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      role: "Tech Journalist",
      bio: "Breaking down the latest in AI, robotics, and emerging tech. I turn complex concepts into easy-to-read stories.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 56, followers: "12k" }
    },
    {
      id: 5,
      name: "David Kim",
      role: "Creative Writer",
      bio: "Passionate about storytelling and the power of words. I explore fiction, poetry, and the art of narrative.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 31, followers: "2.1k" }
    },
    {
      id: 6,
      name: "Maya Patel",
      role: "Travel Enthusiast",
      bio: "Sharing my adventures from around the globe. From hidden gems to popular destinations, I capture the spirit of travel.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 18, followers: "5.4k" }
    },
    {
      id: 7,
      name: "Marcus Thorne",
      role: "Cybersecurity Expert",
      bio: "Keeping you safe in the digital world. I write about privacy, encryption, and the latest security threats.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 27, followers: "1.9k" }
    },
    {
      id: 8,
      name: "Sophia Rossi",
      role: "Food Critic",
      bio: "A culinary journey through taste and tradition. I review restaurants and share unique recipes from my kitchen.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=250&h=250&auto=format&fit=crop",
      stats: { posts: 49, followers: "8.2k" }
    }
  ];

  return (
    <main className="page">
      <div className="page__header" style={{ textAlign: 'center', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
        <h1 className="page__heading" style={{ fontSize: '3.5rem' }}>Our Top <span>Bloggers</span></h1>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Meet the creative minds behind our most popular stories and insights.
        </p>
      </div>

      <div className="blogger-grid">
        {bloggers.map(blogger => (
          <div key={blogger.id} className="blogger-card">
            <img src={blogger.avatar} alt={blogger.name} className="blogger-card__avatar" />
            <h2 className="blogger-card__name">{blogger.name}</h2>
            <div className="blogger-card__role">{blogger.role}</div>
            <p className="blogger-card__bio">{blogger.bio}</p>
            
            <div className="blogger-card__stats">
              <div className="blogger-stat">
                <span className="blogger-stat__value">{blogger.stats.posts}</span>
                <span className="blogger-stat__label">Posts</span>
              </div>
              <div className="blogger-stat">
                <span className="blogger-stat__value">{blogger.stats.followers}</span>
                <span className="blogger-stat__label">Followers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Bloggers;
