function VCProtectedForm() {
  const [vc, setVc] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    const response = await axios.post('http://localhost:3000/verify', { vc });
    if (response.data.valid) {
      setVerified(true);
    } else {
      alert("Invalid Credential");
    }
  };

  return (
    <div>
      <textarea onChange={(e) => setVc(e.target.value)} />
      <button onClick={handleVerify}>Verify Credential</button>
      {verified && <FormComponent />}
    </div>
  );
}
