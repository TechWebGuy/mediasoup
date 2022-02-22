import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Router, RouterOptions } from './Router';
export declare type WorkerLogLevel = 'debug' | 'warn' | 'error' | 'none';
export declare type WorkerLogTag = 'info' | 'ice' | 'dtls' | 'rtp' | 'srtp' | 'rtcp' | 'rtx' | 'bwe' | 'score' | 'simulcast' | 'svc' | 'sctp' | 'message';
export declare type WorkerSettings = {
    /**
     * Logging level for logs generated by the media worker subprocesses (check
     * the Debugging documentation). Valid values are 'debug', 'warn', 'error' and
     * 'none'. Default 'error'.
     */
    logLevel?: WorkerLogLevel;
    /**
     * Log tags for debugging. Check the meaning of each available tag in the
     * Debugging documentation.
     */
    logTags?: WorkerLogTag[];
    /**
     * Minimun RTC port for ICE, DTLS, RTP, etc. Default 10000.
     */
    rtcMinPort?: number;
    /**
     * Maximum RTC port for ICE, DTLS, RTP, etc. Default 59999.
     */
    rtcMaxPort?: number;
    /**
     * Path to the DTLS public certificate file in PEM format. If unset, a
     * certificate is dynamically created.
     */
    dtlsCertificateFile?: string;
    /**
     * Path to the DTLS certificate private key file in PEM format. If unset, a
     * certificate is dynamically created.
     */
    dtlsPrivateKeyFile?: string;
    /**
     * Custom application data.
     */
    appData?: any;
};
export declare type WorkerUpdateableSettings = Pick<WorkerSettings, 'logLevel' | 'logTags'>;
/**
 * An object with the fields of the uv_rusage_t struct.
 *
 * - http://docs.libuv.org/en/v1.x/misc.html#c.uv_rusage_t
 * - https://linux.die.net/man/2/getrusage
 */
export declare type WorkerResourceUsage = {
    /**
     * User CPU time used (in ms).
     */
    ru_utime: number;
    /**
     * System CPU time used (in ms).
     */
    ru_stime: number;
    /**
     * Maximum resident set size.
     */
    ru_maxrss: number;
    /**
     * Integral shared memory size.
     */
    ru_ixrss: number;
    /**
     * Integral unshared data size.
     */
    ru_idrss: number;
    /**
     * Integral unshared stack size.
     */
    ru_isrss: number;
    /**
     * Page reclaims (soft page faults).
     */
    ru_minflt: number;
    /**
     * Page faults (hard page faults).
     */
    ru_majflt: number;
    /**
     * Swaps.
     */
    ru_nswap: number;
    /**
     * Block input operations.
     */
    ru_inblock: number;
    /**
     * Block output operations.
     */
    ru_oublock: number;
    /**
     * IPC messages sent.
     */
    ru_msgsnd: number;
    /**
     * IPC messages received.
     */
    ru_msgrcv: number;
    /**
     * Signals received.
     */
    ru_nsignals: number;
    /**
     * Voluntary context switches.
     */
    ru_nvcsw: number;
    /**
     * Involuntary context switches.
     */
    ru_nivcsw: number;
};
export declare type WorkerEvents = {
    died: [Error];
};
export declare type WorkerObserverEvents = {
    close: [];
    newrouter: [Router];
};
export declare class Worker extends EnhancedEventEmitter<WorkerEvents> {
    #private;
    /**
     * @private
     * @emits died - (error: Error)
     * @emits @success
     * @emits @failure - (error: Error)
     */
    constructor({ logLevel, logTags, rtcMinPort, rtcMaxPort, dtlsCertificateFile, dtlsPrivateKeyFile, appData }: WorkerSettings);
    /**
     * Worker process identifier (PID).
     */
    get pid(): number;
    /**
     * Whether the Worker is closed.
     */
    get closed(): boolean;
    /**
     * Whether the Worker died.
     */
    get died(): boolean;
    /**
     * App custom data.
     */
    get appData(): any;
    /**
     * Invalid setter.
     */
    set appData(appData: any);
    /**
     * Observer.
     *
     * @emits close
     * @emits newrouter - (router: Router)
     */
    get observer(): EnhancedEventEmitter<WorkerObserverEvents>;
    /**
     * @private
     * Just for testing purposes.
     */
    get routersForTesting(): Set<Router>;
    /**
     * Close the Worker.
     */
    close(): void;
    /**
     * Dump Worker.
     */
    dump(): Promise<any>;
    /**
     * Get mediasoup-worker process resource usage.
     */
    getResourceUsage(): Promise<WorkerResourceUsage>;
    /**
     * Update settings.
     */
    updateSettings({ logLevel, logTags }?: WorkerUpdateableSettings): Promise<void>;
    /**
     * Create a Router.
     */
    createRouter({ mediaCodecs, appData }?: RouterOptions): Promise<Router>;
    private workerDied;
}
//# sourceMappingURL=Worker.d.ts.map