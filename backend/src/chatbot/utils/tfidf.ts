// TF-IDF Calculator untuk menghitung similarity antara dokumen menggunakan algoritma Term Frequency
export class TFIDFCalculator {
  private documents: string[];
  private vocabulary: string[];
  private idfScores: Map<string, number>;
  private documentVectors: number[][];

  // Stopwords bahasa Indonesia yang umum
  private stopwords = new Set([
    'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'adalah', 'dengan',
    'ini', 'itu', 'dalam', 'tidak', 'ada', 'akan', 'telah', 'dapat', 'oleh',
    'apa', 'siapa', 'kapan', 'dimana', 'mengapa', 'bagaimana', 'atau', 'juga',
    'saya', 'kamu', 'dia', 'kita', 'mereka', 'ya', 'sudah', 'bisa', 'harus',
  ]);

  constructor(documents: string[]) {
    this.documents = documents;
    this.vocabulary = [];
    this.idfScores = new Map();
    this.documentVectors = [];

    // Proses semua dokumen dan hitung TF-IDF
    this.buildVocabulary();
    this.calculateIDF(); 
    // this.calculateDocumentVectors(); // (Di-comment dulu)
  }

  // Preprocessing teks
  private preprocess(text: string): string[] {
    const lowercased = text.toLowerCase();

    const tokens = lowercased
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);

    const filtered = tokens.filter(token => !this.stopwords.has(token));

    return filtered;
  }

  // Membangun vocabulary dari semua dokumen
  private buildVocabulary(): void {
    const vocabSet = new Set<string>();

    for (const doc of this.documents) {
      const tokens = this.preprocess(doc);
      tokens.forEach(token => vocabSet.add(token));
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
}
