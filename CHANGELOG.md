# Changelog


### 2.5.6

* `Producer.cpp`: Remove `UpdateRtpParameters()`. It was broken since Consumers
  were not notified about profile removed and so on, so they may crash.
* `Producer.cpp: Remove some maps and simplify streams handling by having a
  single `mapSsrcRtpStreamInfo`. Just keep `mapActiveProfiles` because
  `GetActiveProfiles()` method needs it.
* `Producer::MayNeedNewStream()`: Ignore new media streams with new SSRC if
  its RID is already in use by other media stream (fixes #235).
* Fix a bad memory access when using two byte RTP header extensions.


### 2.5.5

* `Server.js`: If a worker crashes make sure `_latestWorkerIdx` becomes 0.


### 2.5.4

* `server.Room()`: Assign workers incrementally or explicitely via new `workerIdx` argument.
* Add `server.numWorkers` getter.


### 2.5.3

* Don't announce `muxId` nor RTP MID extension support in `Consumer` RTP parameters.


### 2.5.2

* Enable RTP MID extension again.


### 2.5.1

* Disable RTP MID extension until [#230](https://github.com/versatica/mediasoup/issues/230) is fixed.


### 2.5.0

* Add RTP MID extension support.

### 2.4.6

* Do not close `Transport` on ICE disconnected (as it would prevent ICE restart on "recv" TCP transports).


### 2.4.5

* Improve codec matching.


### 2.4.4

* Fix audio codec matching when `channels` parameter is not given.


### 2.4.3

* Make `PlainRtpTransport` not leak if port allocation fails (related issue [#224](https://github.com/versatica/mediasoup/issues/224)).


### 2.4.2

* Fix a crash in when no more RTP ports were available (see related issue [#222](https://github.com/versatica/mediasoup/issues/222)).


### 2.4.1

* Update dependencies.


### 2.4.0

* Allow non WebRTC peers to create plain RTP transports (no ICE/DTLS/SRTP but just plain RTP and RTCP) for sending and receiving media.


### 2.3.3

* Fix C++ syntax to avoid an error when building the worker with clang 8.0.0 (OSX 10.11.6).


### 2.3.2

* `Channel.js`: Upgrade `REQUEST_TIMEOUT` to 20 seconds to avoid timeout errors when the the Node or worker thread usage is too high (related to this [issue](https://github.com/versatica/mediasoup-client/issues/48)).


### 2.3.1

* H264: Check if there is room for the indicated NAL unit size (thanks @ggarber).
* H264: Code cleanup.


### 2.3.0

* Add new "spy" feature. A "spy" peer cannot produce media and is invisible for other peers in the room.


### 2.2.7

* Fix H264 simulcast by properly detecting when the profile switching should be done.
* Fix a crash in `Consumer::GetStats()` (see related issue [#196](https://github.com/versatica/mediasoup/issues/196)).


### 2.2.6

* Add H264 simulcast capability.


### 2.2.5

* Avoid calling deprecated (NOOP) `SSL_CTX_set_ecdh_auto()` function in OpenSSL >= 1.1.0.


### 2.2.4

* [Fix #4](https://github.com/versatica/mediasoup/issues/4): Avoid DTLS handshake fragmentation.


### 2.2.3

* [Fix #196](https://github.com/versatica/mediasoup/issues/196): Crash in `Consumer::getStats()` due to wrong `targetProfile`.


### 2.2.2

* Improve [issue #209](https://github.com/versatica/mediasoup/issues/209).


### 2.2.1

* [Fix #209](https://github.com/versatica/mediasoup/issues/209): `DtlsTransport`: don't crash when signaled fingerprint and DTLS fingerprint do not match (thanks @yangjinecho for reporting it).


### 2.2.0

* Update Node and C/C++ dependencies.


### 2.1.0

* Add `localIP` option for `room.createRtpStreamer()` and `transport.startMirroring()` [PR #199](https://github.com/versatica/mediasoup/pull/199).


### 2.0.16

* Improve C++ usage (remove "warning: missing initializer for member" [-Wmissing-field-initializers]).
* Update Travis-CI settings.


### 2.0.15

* Make `PlainRtpTransport` also send RTCP SR/RR reports (thanks @artushin for reporting).


### 2.0.14

* [Fix #193](https://github.com/versatica/mediasoup/issues/193): `preferTcp` not honored (thanks @artushin).

### 2.0.13

* Avoid crash when no remote IP/port is given.


### 2.0.12

* Add `handled` and `unhandled` events to `Consumer`.


### 2.0.11

* [Fix #185](https://github.com/versatica/mediasoup/issues/185): Consumer: initialize effective profile to 'NONE' (thanks @artushin).
* [Fix #186](https://github.com/versatica/mediasoup/issues/186): NackGenerator code being executed after instance deletion (thanks @baiyufei).


### 2.0.10

* [Fix #183](https://github.com/versatica/mediasoup/issues/183): Always reset the effective `Consumer` profile when removed (thanks @thehappycoder).


### 2.0.9

* Make ICE+DTLS more flexible by allowing sending DTLS handshake when ICE is just connected.


### 2.0.8

* Disable stats periodic retrieval also on remote closure of `Producer` and `WebRtcTransport`.


### 2.0.7

* [Fix #180](https://github.com/versatica/mediasoup/issues/180): Added missing include `cmath` so that `std::round` can be used (thanks @jacobEAdamson).


### 2.0.6

* [Fix #173](https://github.com/versatica/mediasoup/issues/173): Avoid buffer overflow in `()` (thanks @lightmare).
* Improve stream layers management in `Consumer` by using the new `RtpMonitor` class.


### 2.0.5

* [Fix #164](https://github.com/versatica/mediasoup/issues/164): Sometimes video freezes forever (no RTP received in browser at all).
* [Fix #160](https://github.com/versatica/mediasoup/issues/160): Assert error in `RTC::Consumer::GetStats()`.


### 2.0.4

* [Fix #159](https://github.com/versatica/mediasoup/issues/159): Don’t rely on VP8 payload descriptor flags to assure the existence of data.
* [Fix #160](https://github.com/versatica/mediasoup/issues/160): Reset `targetProfile` when the corresponding profile is removed.


### 2.0.3

* worker: Fix crash when VP8 payload has no `PictureId`.


### 2.0.2

* worker: Remove wrong `assert` on `Producer::DeactivateStreamProfiles()`.


### 2.0.1

* Update README file.


### 2.0.0

* New design based on `Producers` and `Consumer` plus a mediasoup protocol and the **mediasoup-client** client side SDK.


### 1.2.8

* Fix a crash due to RTX packet processing while the associated `NackGenerator` is not yet created.


### 1.2.7

* Habemus RTX ([RFC 4588](https://tools.ietf.org/html/rfc4588)) for proper RTP retransmission.


### 1.2.6

* Fix an issue in `buffer.toString()` that makes mediasoup fail in Node 8.
* Update libuv to version 1.12.0.


### 1.2.5

* Add support for [ICE renomination](https://tools.ietf.org/html/draft-thatcher-ice-renomination).


### 1.2.4

* Fix a SDP negotiation issue when the remote peer does not have compatible codecs.


### 1.2.3

* Add video codecs supported by Microsoft Edge.


### 1.2.2

* `RtpReceiver`: generate RTCP PLI when "rtpraw" or "rtpobject" event listener is set.


### 1.2.1

* `RtpReceiver`: fix an error producing packets when "rtpobject" event is set.


### 1.2.0

* `RtpSender`: allow `disable()`/`enable()` without forcing SDP renegotiation (#114).


### 1.1.0

* Add `Room.on('audiolevels')` event.


### 1.0.2

* Set a maximum value of 1500 bytes for packet storage in `RtpStreamSend`.


### 1.0.1

* Avoid possible segfault if `RemoteBitrateEstimator` generates a bandwidth estimation with zero SSRCs.


### 1.0.0

* First stable release.
