#ifndef MS_RTC_ROUTER_HPP
#define MS_RTC_ROUTER_HPP

#include "common.hpp"
#include "Channel/Notifier.hpp"
#include "Channel/Request.hpp"
#include "RTC/Consumer.hpp"
#include "RTC/ConsumerListener.hpp"
#include "RTC/Producer.hpp"
#include "RTC/ProducerListener.hpp"
#include "RTC/RtpPacket.hpp"
#include "RTC/Transport.hpp"
// TODO: Let's see.
// #include "RTC/RTCP/Feedback.hpp"
// #include "RTC/RTCP/ReceiverReport.hpp"
// #include "RTC/RTCP/Sdes.hpp"
// #include "RTC/RTCP/SenderReport.hpp"
#include "handles/Timer.hpp"
#include <json/json.h>
#include <unordered_map>
#include <unordered_set>

namespace RTC
{
	class Router : public RTC::Transport::Listener,
	               public RTC::ProducerListener,
	               public RTC::ConsumerListener,
	               public Timer::Listener
	{
	public:
		class Listener
		{
		public:
			virtual void OnRouterClosed(RTC::Router* router) = 0;
		};

	private:
		struct AudioLevelContainer
		{
			int16_t numdBovs{ 0 };
			int16_t sumdBovs{ 0 };
		};

	public:
		Router(Listener* listener, Channel::Notifier* notifier, uint32_t routerId);

	private:
		virtual ~Router();

	public:
		void Destroy();
		Json::Value ToJson() const;
		void HandleRequest(Channel::Request* request);

	private:
		RTC::Transport* GetTransportFromRequest(
		  Channel::Request* request, uint32_t* transportId = nullptr) const;
		RTC::Producer* GetProducerFromRequest(Channel::Request* request, uint32_t* producerId = nullptr) const;
		RTC::Consumer* GetConsumerFromRequest(Channel::Request* request, uint32_t* consumerId = nullptr) const;

		/* Pure virtual methods inherited from RTC::Transport::Listener. */
	public:
		void OnTransportClosed(RTC::Transport* transport) override;

		/* Pure virtual methods inherited from RTC::ProducerListener. */
	public:
		void OnProducerClosed(RTC::Producer* producer) override;
		void OnProducerRtpParametersUpdated(RTC::Producer* producer) override;
		void OnProducerPaused(RTC::Producer* producer) override;
		void OnProducerResumed(RTC::Producer* producer) override;
		void OnProducerRtpPacket(RTC::Producer* producer, RTC::RtpPacket* packet) override;

		/* Pure virtual methods inherited from RTC::ConsumerListener. */
	public:
		void OnConsumerClosed(RTC::Consumer* consumer) override;
		void OnConsumerFullFrameRequired(RTC::Consumer* consumer) override;

		/* Pure virtual methods inherited from Timer::Listener. */
	public:
		void OnTimer(Timer* timer) override;

	public:
		// Passed by argument.
		uint32_t routerId{ 0 };

	private:
		// Passed by argument.
		Listener* listener{ nullptr };
		Channel::Notifier* notifier{ nullptr };
		// Allocated by this.
		Timer* audioLevelsTimer{ nullptr };
		// Others.
		std::unordered_map<uint32_t, RTC::Transport*> transports;
		std::unordered_map<uint32_t, RTC::Producer*> producers;
		std::unordered_map<uint32_t, RTC::Consumer*> consumers;
		std::unordered_map<const RTC::Producer*, std::unordered_set<RTC::Consumer*>> mapProducerConsumers;
		std::unordered_map<const RTC::Consumer*, RTC::Producer*> mapConsumerProducer;
		std::unordered_map<RTC::Producer*, struct AudioLevelContainer> mapProducerAudioLevelContainer;
		bool audioLevelsEventEnabled{ false };
	};
} // namespace RTC

#endif
