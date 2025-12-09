// TF-IDF Calculator untuk menghitung similarity antara dokumen menggunakan algoritma Term Frequency
export class TFIDFCalculator {
  private documents: string[];
  private vocabulary: string[];
  private idfScores: Map<string, number>;
  private documentVectors: number[][];

  // Stopwords bahasa Indonesia yang umum
  private stopwords = new Set([
    'yang',
    'dan',
    'di',
    'ke',
    'dari',
    'untuk',
    'pada',
    'adalah',
    'dengan',
    'ini',
    'itu',
    'dalam',
    'tidak',
    'ada',
    'akan',
    'telah',
    'dapat',
    'oleh',
    'apa',
    'siapa',
    'kapan',
    'dimana',
    'mengapa',
    'bagaimana',
    'atau',
    'juga',
    'saya',
    'kamu',
    'dia',
    'kita',
    'mereka',
    'ya',
    'sudah',
    'bisa',
    'harus',
  ]);

  constructor(documents: string[]) {
    this.documents = documents;
    this.vocabulary = [];
    this.idfScores = new Map();
    this.documentVectors = [];

    // Proses semua dokumen dan hitung TF-IDF
    this.buildVocabulary();
    this.calculateIDF();
    this.calculateDocumentVectors();
  }

  // Preprocessing teks
  private preprocess(text: string): string[] {
    const lowercased = text.toLowerCase();

    const tokens = lowercased
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 0);

    const filtered = tokens.filter((token) => !this.stopwords.has(token));

    return filtered;
  }

  // Membangun vocabulary dari semua dokumen
  private buildVocabulary(): void {
    const vocabSet = new Set<string>();

    for (const doc of this.documents) {
      const tokens = this.preprocess(doc);
      tokens.forEach((token) => vocabSet.add(token));
    }

    this.vocabulary = Array.from(vocabSet);
  }

  //  Menghitung Term Frequency untuk sebuah dokumen
  private calculateTF(tokens: string[]): Map<string, number> {
    const tf = new Map<string, number>();
    const totalTokens = tokens.length;

    if (totalTokens === 0) return tf;

    for (const token of tokens) {
      tf.set(token, (tf.get(token) || 0) + 1);
    }

    for (const [term, freq] of tf.entries()) {
      tf.set(term, freq / totalTokens);
    }

    return tf;
  }

  //  Menghitung Inverse Document Frequency untuk semua term
  private calculateIDF(): void {
    const N = this.documents.length;

    for (const term of this.vocabulary) {
      let documentFrequency = 0;

      for (const doc of this.documents) {
        const tokens = this.preprocess(doc);
        if (tokens.includes(term)) {
          documentFrequency++;
        }
      }

      const idf = Math.log(N / (documentFrequency + 1)) + 1;
      this.idfScores.set(term, idf);
    }
  }

  //  Menghitung TF-IDF vector untuk sebuah dokumen
  private calculateTFIDFVector(text: string): number[] {
    const tokens = this.preprocess(text);
    const tf = this.calculateTF(tokens);
    const vector: number[] = [];

    for (const term of this.vocabulary) {
      const tfValue = tf.get(term) || 0;
      const idfValue = this.idfScores.get(term) || 0;
      const tfidf = tfValue * idfValue;
      vector.push(tfidf);
    }

    return vector;
  }

  //  Menghitung vector untuk semua dokumen dalam dataset
  private calculateDocumentVectors(): void {
    for (const doc of this.documents) {
      const vector = this.calculateTFIDFVector(doc);
      this.documentVectors.push(vector);
    }
  }

  //  Menghitung cosine similarity antara dua vector
  private cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vector dimensions must match');
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      magnitudeA += vectorA[i] * vectorA[i];
      magnitudeB += vectorB[i] * vectorB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }

  //  Menghitung similarity score antara query dengan semua dokumen
  getSimilarityScores(query: string): number[] {
    const queryVector = this.calculateTFIDFVector(query);
    const scores: number[] = [];

    for (const docVector of this.documentVectors) {
      const similarity = this.cosineSimilarity(queryVector, docVector);
      scores.push(similarity);
    }

    return scores;
  }
}
