import { database, ref, runTransaction, get } from "./firebase";

/**
 * 記事の閲覧数を取得する
 */
export async function getViewCount(articleId: string): Promise<number> {
  const viewRef = ref(database, `views/${articleId}`);
  const snapshot = await get(viewRef);
  return snapshot.val() || 0;
}

/**
 * 記事の閲覧数をインクリメントして取得する
 * セッション中に同じ記事を複数回見ても1回だけカウント
 */
export async function incrementViewCount(articleId: string): Promise<number> {
  // セッションストレージで重複カウントを防止
  const storageKey = `viewed_${articleId}`;
  const alreadyViewed = sessionStorage.getItem(storageKey);

  const viewRef = ref(database, `views/${articleId}`);

  if (alreadyViewed) {
    // 既に閲覧済みの場合は現在の値を返す
    const snapshot = await get(viewRef);
    return snapshot.val() || 0;
  }

  // 閲覧済みフラグをセット
  sessionStorage.setItem(storageKey, "true");

  // トランザクションで閲覧数をインクリメント
  const result = await runTransaction(viewRef, (currentValue) => {
    return (currentValue || 0) + 1;
  });

  return result.snapshot.val();
}
