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

    try {
      console.log('Checking enrollment ID:', enrollmentId);
      const studentRef = doc(db, 'students', enrollmentId);
      console.log('Student reference created');
      
      const studentDoc = await getDoc(studentRef);
      console.log('Document fetched:', studentDoc.exists() ? 'exists' : 'does not exist');

      if (studentDoc.exists()) {
        const studentData = studentDoc.data() as StudentData;
        console.log('Student data:', studentData);
        setMessage(`✅ Registered Student!\nName: ${studentData.name}`);
      } else {
        setMessage('❌ Not registered in the system');
      }
    } catch (err) {
      console.error('Error checking registration:', err);
      setMessage('❌ Error: Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Check Registration Status</h1>
        
        <form onSubmit={checkRegistration} className="space-y-4">
          <div>
            <label htmlFor="enrollmentId" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Enrollment ID
            </label>
            <input
              type="text"
              id="enrollmentId"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your enrollment ID"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? 'Checking...' : 'Check Status'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg text-center ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 
            message.includes('❌') ? 'bg-red-100 text-red-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {message.split('\n').map((line, i) => (
              <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyStudent; 