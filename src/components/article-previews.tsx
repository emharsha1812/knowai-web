export function ArticlePreviews() {
  return (
    <section className="py-24 px-4 container mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-heading text-3xl">Selected Writing</h2>
        <a href="#" className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground">View all</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border border border-border">
        {/* Featured Left Card */}
        <article className="md:col-span-2 bg-background hover:bg-white transition-colors p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6 text-xs font-mono uppercase text-muted-foreground tracking-wider">
              <span>Attention Mechanisms</span>
              <span>•</span>
              <span>15 min read</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading mb-4">Tiling Strategy in Flash Attention</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl mb-12">
              A block-wise computation method that avoids materializing the large O(N^2) attention matrix by computing softmax incrementally. We reconstruct the CUDA logic in pure PyTorch to understand exactly what fits in SRAM.
            </p>
          </div>
          
          <div className="bg-[#111] p-6 text-xs font-mono text-muted-foreground/70 overflow-x-auto w-full max-w-2xl border border-muted/20">
            <code>
              <span className="text-accent-foreground"># Iterating over blocks of keys & values</span><br/>
              <span className="text-blue-400">for</span> j <span className="text-blue-400">in</span> <span className="text-accent-foreground">range</span>(0, N, B_c):<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;k_j = k[:, j:j+B_c, :]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;v_j = v[:, j:j+B_c, :]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-foreground"># S_ij shape: (B, H, B_r, B_c)</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;S_ij = torch.matmul(q_i, k_j.transpose(-2, -1))
            </code>
          </div>
        </article>

        {/* Right Cards Stacked */}
        <div className="flex flex-col gap-[1px] bg-border md:col-span-1">
          <article className="flex-1 bg-background hover:bg-white transition-colors p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 text-xs font-mono uppercase text-muted-foreground tracking-wider">
              <span>State Space</span>
            </div>
            <h3 className="text-xl font-heading mb-3">Mamba and HiPPO Dynamics</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              How state space models project inputs into a continuous memory representation using HiPPO matrices.
            </p>
          </article>
          <article className="flex-1 bg-background hover:bg-white transition-colors p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 text-xs font-mono uppercase text-muted-foreground tracking-wider">
              <span>Systems</span>
            </div>
            <h3 className="text-xl font-heading mb-3">KV Cache Offloading</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Managing memory limits on consumer GPUs during large context inference via CPU/RAM staging.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
