import { Calendar, MapPin, DollarSign, Image, Check, X, Info, Plus } from 'lucide-react';


const FAQSection = ({ faqs, setFaqs, currentFAQ, setCurrentFAQ }) => {
  const handleFAQChange = (e) => {
    const { name, value } = e.target;
    setCurrentFAQ({
      ...currentFAQ,
      [name]: value
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFAQ();
    }
  };

  const addFAQ = () => {
    if (currentFAQ.question.trim() === '' || currentFAQ.answer.trim() === '') return;
    setFaqs([...faqs, currentFAQ]);
    setCurrentFAQ({ question: '', answer: '' });
  };

  const removeFAQ = (index) => {
    const newFAQs = [...faqs];
    newFAQs.splice(index, 1);
    setFaqs(newFAQs);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input
                type="text"
                name="question"
                value={currentFAQ.question}
                onChange={handleFAQChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter question"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <input
                type="text"
                name="answer"
                value={currentFAQ.answer}
                onChange={handleFAQChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter answer"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addFAQ}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">{faq.question}</h4>
                <button
                  type="button"
                  onClick={() => removeFAQ(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection