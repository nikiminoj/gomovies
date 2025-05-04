import * as tf from '@tensorflow/tfjs-node';

export async function matrixFactorization(
  R: number[][],
  numFactors: number = 10,
  learningRate: number = 0.01,
  reg: number = 0.02,
  epochs: number = 100,
): Promise<{ U: number[][]; V: number[][] }> {
  const numUsers = R.length;
  const numItems = R[0].length;

  // Convert R to a TensorFlow tensor
  const RTensor = tf.tensor2d(R);

  // Randomly initialize latent factor matrices
  const U = tf.randomUniform([numUsers, numFactors]).variable();
  const V = tf.randomUniform([numItems, numFactors]).variable();

  const optimizer = tf.train.sgd(learningRate);

  for (let epoch = 0; epoch < epochs; epoch++) {
    for (let i = 0; i < numUsers; i++) {
      for (let j = 0; j < numItems; j++) {
        if (R[i][j] > 0) {
          optimizer.minimize(() => {
            const prediction = U.slice([i, 0], [1, numFactors])
              .matMul(V.slice([j, 0], [1, numFactors]).transpose())
              .reshape([]);
            const error = RTensor.slice([i, j], [1, 1]).reshape([]).sub(prediction);

            const uRegularization = tf.mul(reg, U.slice([i, 0], [1, numFactors]).norm());
            const vRegularization = tf.mul(reg, V.slice([j, 0], [1, numFactors]).norm());
             const loss = tf.add(tf.add(tf.mul(error, error), uRegularization), vRegularization);

            return loss
          });
        }
      }
    }
    await tf.nextFrame();
  }
  const UData = await U.array();
  const VData = await V.array();

  U.dispose();
  V.dispose();
  RTensor.dispose();
  return { U: UData, V: VData };
}

export function predictRatingMatrixFactorization(
  userId: number,
  movieId: number,
  U: number[][],
  V: number[][],
): number {
  const userVector = tf.tensor1d(U[userId]);
  const movieVector = tf.tensor1d(V[movieId]);
  const dotProduct = userVector.dot(movieVector).arraySync() as number;
  userVector.dispose();
  movieVector.dispose();
  return dotProduct;
}