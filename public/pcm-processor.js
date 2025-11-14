/**
 * PCM Audio Processor Worklet for Deepgram Agent API
 *
 * This AudioWorkletProcessor handles real-time streaming of PCM audio chunks
 * from the Deepgram Agent API, providing smooth, gap-free playback.
 *
 * Based on: https://github.com/deepgram/aura-2-browser-live
 */

class PCMPlayerProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    // FIFO buffer for incoming audio samples
    this.buffer = [];

    // Receive audio chunks from main thread
    this.port.onmessage = (event) => {
      // Push all samples from the incoming Float32Array into our buffer
      this.buffer.push(...event.data);
    };
  }

  /**
   * Called by the browser's audio rendering thread at regular intervals
   * (typically every 128 samples at the current sample rate)
   *
   * @param {Float32Array[][]} inputs - Input audio (unused for playback)
   * @param {Float32Array[][]} outputs - Output audio buffers to fill
   * @param {Object} parameters - Audio parameters (unused)
   * @returns {boolean} - true to keep processor alive
   */
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0]; // Mono channel

    // Fill the output buffer with queued samples
    for (let i = 0; i < channel.length; i++) {
      // Output next sample from buffer, or 0 (silence) if buffer is empty
      channel[i] = this.buffer.length > 0 ? this.buffer.shift() : 0;
    }

    // Return true to keep the processor running
    return true;
  }
}

// Register the processor with the AudioWorklet system
registerProcessor('pcm-player-processor', PCMPlayerProcessor);
