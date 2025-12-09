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
    // this.calculateIDF(); // (Di-comment dulu methodnya blm ada)
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
}
