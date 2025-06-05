import { useState } from 'react';
import { db, getDoc, doc } from '../firebaseConfig';

interface StudentData {
  name: string;
  enrollmentId: string;
  class?: string;
  section?: string;
  route?: string;
  stop?: string;
  parentName?: string;
  parentPhone?: string;
}

const VerifyStudent = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!enrollmentId.trim()) {
      setMessage('❌ Please enter an enrollment ID');
      setIsLoading(false);
      return;
    }

    try {
      const studentRef = doc(db, 'students', enrollmentId.trim());
      const studentDoc = await getDoc(studentRef);

      if (studentDoc.exists()) {
        const studentData = studentDoc.data() as StudentData;
        setMessage(`✅ Registered Student!\nName: ${studentData.name}`);
      } else {
        setMessage('❌ Not registered in the system');
      }
    } catch (err) {
      console.error('Error checking registration:', err);
      setMessage('❌ Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">SpecT</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Verify Registration</h2>
        </div>
        
        <form onSubmit={checkRegistration} className="space-y-6">
          <div>
            <label htmlFor="enrollmentId" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Enrollment ID
            </label>
            <input
              type="text"
              id="enrollmentId"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your enrollment ID"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 font-medium text-lg"
          >
            {isLoading ? 'Verifying...' : 'Verify Registration'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center ${
            message.includes('✅') ? 'bg-green-50 text-green-700 border-2 border-green-200' : 
            message.includes('❌') ? 'bg-red-50 text-red-700 border-2 border-red-200' : 
            'bg-blue-50 text-blue-700 border-2 border-blue-200'
          }`}>
            {message.split('\n').map((line, i) => (
              <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyStudent; 