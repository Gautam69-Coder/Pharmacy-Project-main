import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Insta from "../../assets/logo/insta.svg"
import Twitter from "../../assets/logo/twitter.svg"
import Facebook from "../../assets/logo/facebook.svg"
import Youtube from "../../assets/logo/youtube.svg"

const MedicalBlog = () => {
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);

  // Sample blog data
  const trendingArticles = [
    {
      id: 1,
      title: "Acidity Problems? 21 Home Remedies That Can Help",
      category: "DOCTOR'S SPEAK / HOME REMEDIES",
      author: "Dr Prachi Garg",
      image: "https://goqii.com/blog/wp-content/uploads/shutterstock_1817700434.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Best Foods To Eat and Avoid During Periods",
      category: "FOOD & NUTRITION / HEALTH TODAY",
      author: "Dr. Varun Akinapally",
      image: "https://i.ytimg.com/vi/n5_C11yy2kg/maxresdefault.jpg",
    },
    {
      id: 3,
      title: "Amazing Health Benefits of Turmeric Milk",
      category: "FEATURED / FOOD & NUTRITION",
      author: "Dr Prachi Garg",
      image: "https://www.insurejoy.com/blog/wp-content/uploads/2024/02/Turmeric-Milk.png",
    }
  ];

  const categories = [
    { id: 1, title: "Home Remedies", image: "https://www.verywellhealth.com/thmb/jGrdSwkTYU0io7koG1zFCBtEWew=/4242x2828/filters:fill%2887E3EF,1%29/iStock_77442767_XLARGE-57fc0c535f9b586c35cab765.jpg", description: "Natural solutions for common health issues" },
    { id: 2, title: "Doctor's Advice", image: "https://thumbs.dreamstime.com/b/happy-smiling-doctor-thumbs-up-gesture-isolated-white-background-146198179.jpg", description: "Expert medical guidance and tips" },
    { id: 3, title: "Fitness & Wellness", image: "https://tse1.mm.bing.net/th/id/OIP.p9-sbTNhM5ka2fvf8Ls-tQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Stay healthy with fitness tips" },
    { id: 4, title: "Mental Health", image: "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22028_16430272124432966.jpg", description: "Mental wellness and emotional health" },
    { id: 5, title: "Nutrition", image: "https://now.tufts.edu/sites/default/files/uploaded-assets/images/2022-08/healthy_food_nutritional_report.jpg", description: "Healthy eating and diet plans" }
  ];

  const latestBlogs = [
    { id: 1, title: "Is Bronchitis Contagious? Causes, Transmission, Symptoms", category: "DOCTOR'S SPEAK / FEATURED", author: "Dr. Vishesh Bharucha", image: "https://tse1.explicit.bing.net/th/id/OIP.Gro_e1WrsCrPuq1X5oD8RQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", date: "Aug 8, 2025" },
    { id: 2, title: "HPV in Women: Causes, Symptoms, and Treatment Options", category: "DOCTOR'S SPEAK / FEATURED", author: "Dr. Vishesh Bharucha", image: "https://tse1.mm.bing.net/th/id/OIP.Q1a3dCjwxtriC_CLiHkClgHaE4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", date: "Aug 7, 2025" },
    { id: 3, title: "COVID-19 Vaccine Side Effects and Safety Information", category: "HEALTH TODAY / VACCINES", author: "Dr. Anuja Bodhare", image: "https://wellnesscenter.uic.edu/wp-content/uploads/sites/100/2020/12/COVID-19-VACCINE-GENERIC-BLUE-BACKGROUND-1090x595.jpg", date: "Aug 6, 2025" },
    { id: 4, title: "Understanding Diabetes: Types, Symptoms & Management", category: "DOCTOR'S SPEAK / CHRONIC CONDITIONS", author: "Dr. Rajesh Kumar", image: "https://tse2.mm.bing.net/th/id/OIP.v3bBELgZKdfec3M9AmO20gHaFI?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", date: "Aug 5, 2025" }
  ];

  const featuredBlogs = [
    { id: 1, title: "Simple Home Remedies for Swollen Glands", category: "DOCTOR'S SPEAK / HOME REMEDIES / ORAL HEALTH", author: "Dr Smita Barode", image: "https://www.guidelineshealth.com/wp-content/uploads/2017/05/Home-Remedies-for-Swollen-Glands.jpg" },
    { id: 2, title: "Benefits of Drinking Water from Copper Bottle", category: "FEATURED / HEALTH TODAY", author: "Dr. Arpit Verma", image: "https://flebo.in/health/wp-content/uploads/2022/07/Benefits-And-Ways-To-Use-Copper-Bottle.jpg" },
    { id: 3, title: "Natural Home Remedies To Reduce Belly Fat", category: "DOCTOR'S SPEAK / FEATURED / HEALTH TODAY", author: "Dr Anuja Bodhare", image: "https://th.bing.com/th/id/R.4f0461300829926b8770a5008b50d636?rik=qTWvbhcBdGY1zg&riu=http%3a%2f%2fwww.belmarrahealth.com%2fwp-content%2fuploads%2f2015%2f03%2fnatural-way-to-lose-belly-fat.jpg&ehk=60SgdQBqFUaINtDyQk7cCdjwD3YR1ENxPlVOvFS2IO0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" },
    { id: 4, title: "Best Home Remedies for Smelly Underarms", category: "DOCTOR'S SPEAK / FEATURED / HOME REMEDIES", author: "Dr Anuja Bodhare", image:"https://th.bing.com/th/id/OIP.nFV53aUIBmoPDWduCBizHAHaEK?w=289&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 5, title: "14 Amazing Health Benefits of Cardamom Seeds", category: "FEATURED / FOOD & NUTRITION", author: "Dr Prachi Garg", image: "https://www.quiet-corner.com/wp-content/uploads/2016/11/i-1.jpg" },
    { id: 6, title: "Simple Home Remedies for Frequent Urination", category: "DOCTOR'S SPEAK / HEALTH TODAY / HOME REMEDIES", author: "Dr Rajeev Singh", image: "https://www.lifeberrys.com/img/article/frequent-urination-2-1575095216-lb.jpg" }
  ];

  const nextCategorySlide = () => {
    setCurrentCategorySlide((prev) =>
      prev === categories.length - 3 ? 0 : prev + 1
    );
  };

  const prevCategorySlide = () => {
    setCurrentCategorySlide((prev) =>
      prev === 0 ? categories.length - 3 : prev - 1
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-[6%]">
      {/* Header */}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Trending Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Look What's Trending!</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main Featured Article */}
            <div className="relative">
              <img
                src={trendingArticles[0].image}
                alt={trendingArticles[0].title}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-sm font-medium text-teal-300 uppercase tracking-wide">
                  {trendingArticles[0].category}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-3">{trendingArticles[0].title}</h3>
                <p className="text-sm">By {trendingArticles[0].author}</p>
              </div>
            </div>

            {/* Side Articles */}
            <div className="space-y-6">
              {trendingArticles.slice(1).map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-32 h-32 object-cover flex-shrink-0"
                    />
                    <div className="p-4 flex-1">
                      <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                        {article.category}
                      </span>
                      <h4 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2">{article.title}</h4>
                      <p className="text-sm text-gray-600">By {article.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore By Category */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore By Category</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
               
              >

                {categories.map((category) => (
                  <div key={category.id} className="w-1/3 flex-shrink-0 px-2">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevCategorySlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextCategorySlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </section>

        {/* Latest Blogs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Blogs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                    {blog.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-2 mb-3 line-clamp-2">{blog.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>By {blog.author}</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blog.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View More
            </button>
          </div>
        </section>

        {/* Featured Blogs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Blogs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                    {blog.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-2 mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600">By {blog.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 py-16 px-6 text-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
                <div className="space-y-4">
                  <h1 className="text-xl font-bold mb-6 text-indigo-300">Company</h1>
                  <ul className="space-y-3">
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">About Us</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Careers</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Blog</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Partner with Us</li>
                  </ul>
                </div>
      
                <div className="space-y-4">
                  <h1 className="text-xl font-bold mb-6 text-indigo-300">Featured Categories</h1>
                  <ul className="space-y-3">
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Must Haves</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Diabetes Essentials</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Vitamins & Supplements</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Heart Care</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Ayurvedic Care</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Sports Nutrition</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Skin Care</li>
                  </ul>
                </div>
      
                <div className="space-y-4">
                  <h1 className="text-xl font-bold mb-6 text-indigo-300">Need Help</h1>
                  <ul className="space-y-3">
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Medicines</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Molecules</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Cities</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">FAQs</li>
                  </ul>
                </div>
      
                <div className="space-y-4">
                  <h1 className="text-xl font-bold mb-6 text-indigo-300">Policy Info</h1>
                  <ul className="space-y-3">
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Privacy Policy</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Terms and Conditions</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Return Policy</li>
                    <li className="hover:text-indigo-300 cursor-pointer transition-colors">Customer Support</li>
                  </ul>
                </div>
      
                <div className="space-y-4">
                  <h1 className="text-xl font-bold mb-6 text-indigo-300 text-center md:text-left">Follow Us</h1>
                  <div className="flex justify-center md:justify-start gap-6">
                    <img src={Insta} alt="Instagram" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
                    <img src={Twitter} alt="Twitter" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
                    <img src={Facebook} alt="Facebook" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
                    <img src={Youtube} alt="Youtube" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                </div>
              </div>
      
              <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-700 text-center">
                <p className="text-slate-400">© 2025 TonicHub Pharmacy. All rights reserved.</p>
              </div>
            </footer>
    </div>
  );
};

export default MedicalBlog;