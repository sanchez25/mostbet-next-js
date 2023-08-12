export default function handler(req, res) {
    res.status(200).json({ 
        name: 'John Doe',
        description: 'Some bio about man'
    })
  }