import { X } from 'lucide-react';

const FAQSection = ({ faqs, setFaqs, currentFAQ, setCurrentFAQ, errors }) => {
  const handleFAQChange = (e) => {
    const { name, value } = e.target;
    setCurrentFAQ({
      ...currentFAQ,
      [name]: value,
    });
  };

  const addFAQ = () => {
    if (currentFAQ.question.trim() === '' || currentFAQ.answer.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        faq: 'Both Question and Answer are required',
      }));
      return;
    }
    setFaqs([...faqs, { ...currentFAQ }]);
    setCurrentFAQ({ question: '', answer: '' });
    setErrors((prev) => ({ ...prev, faq: '' }));
  };

  const removeFAQ = (index) => {
    const updatedFAQs = [...faqs];
    updatedFAQs.splice(index, 1);
    setFaqs(updatedFAQs);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
          <input
            type="text"
            name="question"
            value={currentFAQ.question}
            onChange={handleFAQChange}
            placeholder="Enter question"
            className={`w-full px-4 py-2 border ${
              errors.faq ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
          <input
            type="text"
            name="answer"
            value={currentFAQ.answer}
            onChange={handleFAQChange}
            placeholder="Enter answer"
            className={`w-full px-4 py-2 border ${
              errors.faq ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={addFAQ}
        className="px-4 py-2 mb-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add FAQ
      </button>
      {errors.faq && <p className="text-red-500 text-xs mb-2">{errors.faq}</p>}

      <div className="space-y-3">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">{faq.question}</h4>
                <button
                  type="button"
                  onClick={() => removeFAQ(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No FAQs added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FAQSection;